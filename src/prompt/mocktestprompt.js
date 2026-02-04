const { PromptTemplate } = require("@langchain/core/prompts");

module.exports = new PromptTemplate({
  inputVariables: [
    "subject",
    "subTopics",
    "easyCount",
    "mediumCount",
    "hardCount",
    "difficultyBias",
    "questionsPerSubTopic",
  ],

  template: `
    You are an exam question generator.

    Generate a mock test in STRICT JSON format.

    Subject: {subject}

    Subtopics to focus on:
    {subTopics}

    Difficulty distribution:
    - Easy: {easyCount}
    - Medium: {mediumCount}
    - Hard: {hardCount}

    Difficulty bias: {difficultyBias}

    Rules:
        1. Total questions must match the difficulty counts exactly
        2. Each subtopic should have approximately {questionsPerSubTopic} questions
        3. Questions must increase gradually in difficulty
        4. Output ONLY valid JSON
        5. Do NOT add explanations, markdown, or text outside JSON

    JSON format:
    [
        {
            "question": "string",
            "options": ["A", "B", "C", "D"],
            "correctAnswer": "A",
            "difficulty": "EASY | MEDIUM | HARD",
            "subTopic": "string"
        }
    ]
    `,
});
