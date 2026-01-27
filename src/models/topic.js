const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema ({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        reuired:true
    },

    subjectName:{
        type:String,
        required:true, 
    },

    subTopics:{
        type:[String],
    },

    difficultyLevel:{
        type:String, 
        enum:["beginner", "intermediate", "advanced"],
        default:"beginner"
    },

}, {
    timestamps:true,
});

module.exports = mongoose.model( "Topic", topicSchema);