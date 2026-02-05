export const getDifficultySplit = (
  difficultyLevel,
  totalQuestions = 10
) => {
  let distribution;

  switch (difficultyLevel) {
    case "EASY":
      distribution = { easy: 0.6, medium: 0.3, hard: 0.1 };
      break;

    case "MEDIUM":
      distribution = { easy: 0.3, medium: 0.5, hard: 0.2 };
      break;

    case "HARD":
      distribution = { easy: 0.1, medium: 0.4, hard: 0.5 };
      break;

    default:
      distribution = { easy: 0.33, medium: 0.34, hard: 0.33 };
  }

  const easy = Math.round(distribution.easy * totalQuestions);
  const medium = Math.round(distribution.medium * totalQuestions);
  const hard = totalQuestions - easy - medium;

  return { easy, medium, hard };
};
