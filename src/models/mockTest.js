const mongoose = require("mongoose");

const mockTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true
    },

    totalQuestions: {
      type: Number,
      required: true
    },

    difficultyProgression: [
      {
        questionNumber: Number,
        difficulty: String
      }
    ],

    startedAt: {
      type: Date,
      default: Date.now
    },

    completedAt: Date,

    finalScore: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MockTest", mockTestSchema);
