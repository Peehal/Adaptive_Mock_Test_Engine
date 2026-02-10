import Performance from "../models/performance.js";
import MockTest from "../models/mockTest.js";
import ollama from "../utils/ollama.js";

export const getPerformanceAnalysisAPI = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mockTestId } = req.params;

    const mockTest = await MockTest.findById(mockTestId);
    if (!mockTest) {
      return res.status(404).json({ message: "Mock test not found" });
    }

    const performance = await Performance.findOne({
      userId,
      topicId: mockTest.topicId,
    });

    if (!performance) {
      return res.status(404).json({
        message: "No performance data available",
      });
    }

    const accuracy =
      performance.totalQuestions > 0
        ? ((performance.correctAnswers / performance.totalQuestions) * 100).toFixed(2)
        : 0;

    const prompt = `
You are a friendly and clear mentor.

Analyze the student's mock test performance.
Use very simple English.
Avoid complex or academic words.
Be direct, motivating, and easy to understand.

Format the response exactly like this:

1. Overall Summary (2–3 simple sentences)
2. Weak Subtopics (short points with simple tips)
3. Strong Subtopics (short encouragement)
4. 7-Day Study Plan (very short daily tasks)

Performance Data:
Total Questions: ${performance.totalQuestions}
Correct Answers: ${performance.correctAnswers}
Accuracy: ${accuracy}%
Weak Subtopics: ${performance.weakSubTopics.length ? performance.weakSubTopics.join(", ") : "None"}
Strong Subtopics: ${performance.strongSubTopics.length ? performance.strongSubTopics.join(", ") : "None"}
Attempt Number: ${performance.attemptNumber}
`;


    const aiResponse = await ollama.invoke(prompt);

    res.status(200).json({
      message: "AI performance analysis generated",
      performance: {
        totalQuestions: performance.totalQuestions,
        correctAnswers: performance.correctAnswers,
        accuracy,
        weakSubTopics: performance.weakSubTopics,
        strongSubTopics: performance.strongSubTopics,
        attemptNumber: performance.attemptNumber,
      },
      aiAnalysis: aiResponse.content,
    });

  } catch (error) {
    console.error("Ollama analysis error:", error);
    res.status(500).json({ message: "Failed to generate AI analysis" });
  }
};
