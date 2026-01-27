const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        topicId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Topic",
            required:true,
        },

        weakAreas:[String],
        stringAreas:[String],

        suggestedFocus:{
            type:String
        }
    },
    {
        timestamps:true,
    }
)

module.exports  = mongoose.model("Performance", performanceSchema)