import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    selectedOption: {
      type: String,
      required: true,
    },

    isCorrect: {
      type: Boolean,
      required: true,
    },

    timeTaken: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;
