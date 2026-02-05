import mongoose from "mongoose";

const mockTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    difficultyProgression: [
      {
        questionNumber: Number,
        difficulty: String,
      },
    ],

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: Date,

    finalScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const MockTest = mongoose.model("MockTest", mockTestSchema);

export default MockTest;
