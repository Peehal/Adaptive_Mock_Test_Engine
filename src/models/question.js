const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    mockTestId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"MockTest",
        required:true,
    },

    questionText:{
        type: String, 
        required:true,
    },

    options:{
        type:[String],
        required:true,
    },

    correctAnswer:{
        type:String, 
        required:true,
    },

    difficulty:{
        type: String,
        enum:["easy", "medium", "hard"],
        required:true
    },

    explanation: String,

},{
    timestamps:true
});

module.exports = mongoose.model("Question", questionSchema);