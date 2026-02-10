import ollama from "../utils/ollama.js";
import mongoose from "mongoose";
import PromptTemplate from "../prompt/mocktestprompt.js";
import MockTest from "../models/mockTest.js";
import Topic from "../models/topic.js";
import Question from "../models/question.js";
import Performance from "../models/performance.js";
import Response from "../models/response.js";
import { analyzePerformance } from "../services/performance.js";
import { getDifficultySplit } from "../services/difficulty.js";

export const generateMocktest = async (req, res) => {
  try {
    const { topicId } = req.body;
    const userId = req.user.id;

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const TOTAL_QUESTIONS = 10;

    const performance = await Performance.findOne({
      userId,
      topicId,
    });

    const isFirstAttempt = !performance;

    const analysis = analyzePerformance(performance, topic);

    let split;
    if (isFirstAttempt) {
      split = getDifficultySplit(topic.difficultyLevel, TOTAL_QUESTIONS);
    } else {
      split = getDifficultySplit(
        analysis.difficultyLevel,
        TOTAL_QUESTIONS
      );
    }

    const questionsPerSubTopic = Math.floor(
      TOTAL_QUESTIONS / analysis.focusSubTopics.length
    );

    const prompt = await PromptTemplate.format({
      subject: topic.subjectName,
      subTopics: analysis.focusSubTopics.join(","),
      easyCount: split.easy,
      mediumCount: split.medium,
      hardCount: split.hard,
      difficultyBias: analysis.difficultyBias,
      questionsPerSubTopic,
    });

    // Call LLM
    const response = await ollama.invoke(prompt);

    let questions;
    try {
        const cleaned = response.content
        .replace(/,\s*]/g, "]") // remove trailing comma before closing ]
        .replace(/,\s*}/g, "}"); // remove trailing comma before }

        questions = JSON.parse(cleaned);
    } catch (err) {
        return res.status(500).json({
        message: "Invalid JSON from LLM",
        raw: response.content,
    });
    }



    const mockTest = await MockTest.create({
      userId,
      topicId,
      totalQuestions: questions.length,
      attemptNumber: performance
        ? performance.attemptNumber + 1
        : 1,
      difficultyProgression: questions.map((q, i) => ({
        questionNumber: i + 1,
        difficulty: q.difficulty,
      })),
    });

    await Question.insertMany(
  questions.map((q) => ({
    questionText: q.questionText,
    options: q.options,
    correctAnswer: q.correctAnswer,
    difficulty: q.difficulty,
    subTopic: q.subTopic?.trim(), // FORCE SAVE
    mockTestId: mockTest._id,
  }))
);


    res.status(201).json({
      message: isFirstAttempt
        ? "First mock test generated"
        : "Adaptive mock test generated",
      mockTestId: mockTest._id,
      attemptType: isFirstAttempt ? "FIRST" : "ADAPTIVE",
      questions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitMockTest = async (req, res) => {
  try {

    const userId = req.user.id;
    const {mockTestId, responses} = req.body;

    if(!mockTestId || !Array.isArray(responses) || responses.length === 0){
      return res.status(400).json({
        message:"Invalid submission data"
      });
    }
;
    const questions = await Question.find({
      mockTestId: new mongoose.Types.ObjectId(mockTestId),
    });

    const questionMap = new Map();
    questions.forEach(q => {
      questionMap.set(q._id.toString(), q);
    });

    let correctCount = 0 ; 
    const subTopicStats = {};

    const responseDocs = responses.map(r => {
      const question = questionMap.get(r.questionId);

      if (!question) return null;

      const isCorrect = question.correctAnswer === r.selectedOption;
      if(isCorrect) correctCount++;

      const subTopic = question.subTopic || "General";

      if (!subTopicStats[subTopic]) {
        subTopicStats[subTopic] = { correct: 0, total: 0 };
      }
      
      subTopicStats[subTopic].total++;
        if (isCorrect) subTopicStats[subTopic].correct++;


      if (!subTopicStats[subTopic]) {
        subTopicStats[subTopic] = { correct: 0, total: 0 };
      }

      subTopicStats[subTopic].total++;
      if (isCorrect) subTopicStats[subTopic].correct++;


      return {
        userId, 
        questionId: r.questionId, 
        selectedOption: r.selectedOption, 
        isCorrect, 
        timeTaken : r.timeTaken,
      }
    }).filter(Boolean ); 

    await Response.insertMany(responseDocs);

    const totalQuestions = questions.length; 
    const accuracy = totalQuestions ? correctCount / totalQuestions : 0;


    const weakSubTopics = [];
    const strongSubTopics = []; 

    for( const [subTopic, stats] of Object.entries(subTopicStats)){
      const subAccuracy = stats.correct / stats.total;
      if( subAccuracy < 0.5) weakSubTopics.push(subTopic);
      else strongSubTopics.push(subTopic);
    }

    const mockTest = await MockTest.findById(mockTestId);

    const existingPerformance = await Performance.findOne({
      userId, 
      topicId : mockTest.topicId,
    });


    if(existingPerformance){
      existingPerformance.totalQuestions += totalQuestions;
      existingPerformance.correctAnswers += correctCount; 
      existingPerformance.attemptNumber += 1; 
      existingPerformance.weakSubTopics = weakSubTopics; 
      existingPerformance.strongSubTopics = strongSubTopics;

      await existingPerformance.save();
    }else{
      await Performance.create({
        userId,
        topicId: mockTest.topicId,
        totalQuestions,
        correctAnswers: correctCount,
        weakSubTopics,
        strongSubTopics,
        attemptNumber: 1,
      });
    }


     res.status(200).json({
      message: "Mock test submitted successfully",
      score: correctCount,
      totalQuestions,
      accuracy,
      weakSubTopics,
      strongSubTopics,
    });

  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}

export const generateAdaptiveMock = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId, questionCount = 10 } = req.body;

    if (!topicId) {
      return res.status(400).json({ message: "topicId is required" });
    }

    const performance = await Performance.findOne({ userId, topicId });

    const weakSubTopics = performance?.weakSubTopics || [];
    const strongSubTopics = performance?.strongSubTopics || [];

    const previousMocks = await MockTest.find({ topicId });

    if (previousMocks.length === 0) {
      return res.status(400).json({
        message: "No previous mock tests found for this topic"
      });
    }

    const mockIds = previousMocks.map(m => m._id);

    const allQuestions = await Question.find({
      mockTestId: { $in: mockIds }
    });

    if (allQuestions.length === 0) {
      return res.status(400).json({
        message: "No questions exist for this topic"
      });
    }

    const weakCount = Math.floor(questionCount * 0.6);
    const avgCount = Math.floor(questionCount * 0.3);
    const strongCount = questionCount - weakCount - avgCount;

    const shuffle = arr => arr.sort(() => 0.5 - Math.random());

    const weakQs = shuffle(
      allQuestions.filter(q => weakSubTopics.includes(q.subTopic))
    ).slice(0, weakCount);

    const strongQs = shuffle(
      allQuestions.filter(q => strongSubTopics.includes(q.subTopic))
    ).slice(0, strongCount);

    const avgQs = shuffle(
      allQuestions.filter(
        q =>
          !weakSubTopics.includes(q.subTopic) &&
          !strongSubTopics.includes(q.subTopic)
      )
    ).slice(0, avgCount);

    let questions = [...weakQs, ...avgQs, ...strongQs];

    // 5️⃣ Fallback fill
    if (questions.length < questionCount) {
      const remaining = questionCount - questions.length;

      const extra = shuffle(
        allQuestions.filter(q => !questions.includes(q))
      ).slice(0, remaining);

      questions.push(...extra);
    }

    // 6️⃣ Create adaptive mock
    const mockTest = await MockTest.create({
      userId,
      topicId,
      questions: questions.map(q => q._id),
      totalQuestions: questions.length,
      isAdaptive: true
    });

    res.status(200).json({
      message: "Adaptive mock generated",
      mockTestId: mockTest._id,
      totalQuestions: questions.length
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
