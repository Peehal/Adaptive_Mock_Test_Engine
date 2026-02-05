export const analyzePerformance = (performance, topic) => {
  if (!performance) {
    return {
      accuracy: null,
      difficultyLevel: topic.difficultyLevel,
      difficultyBias: "BALANCED",
      focusSubTopics: topic.subTopics || [],
    };
  }

  const total = performance.totalQuestions || 0;
  const correct = performance.correctAnswers || 0;

  const accuracy = Math.min(
    1,
    Math.max(0, total > 0 ? correct / total : 0)
  );

  let difficultyLevel = "MEDIUM";
  let difficultyBias = "BALANCED";

  if (accuracy < 0.4) {
    difficultyLevel = "EASY";
    difficultyBias = "EASY_HEAVY";
  } else if (accuracy < 0.7) {
    difficultyLevel = "MEDIUM";
    difficultyBias = "MEDIUM_HEAVY";
  } else {
    difficultyLevel = "HARD";
    difficultyBias = "HARD_HEAVY";
  }

  return {
    accuracy,
    difficultyLevel,
    difficultyBias,
    focusSubTopics:
      performance.weakSubTopics?.length > 0
        ? performance.weakSubTopics
        : topic.subTopics || [],
  };
};

