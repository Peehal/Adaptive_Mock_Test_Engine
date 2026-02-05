import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },

  topicId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },

  totalQuestions: Number,
  correctAnswers: Number,

  weakSubTopics: [String],
  strongSubTopics: [String],

  attemptNumber: { 
    type: Number, 
    default: 1 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Performance = mongoose.model("Performance", PerformanceSchema);

export default Performance;
