const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        lowercase:true,
        unique:true,
    },

    password:{
        type:String, 
        required:true,
    }, 
    role:{
        type:String, 
        enum:["student", "Admin"],
    }, 

    totalTestGiven:{
        type:Number, 
        default:0,
    },
    
    averageScore:{
        type:Number, 
        default:0,
    },

    strength:[String],
    weaknesses:[String],

},{
    timestamps:true,
})

module.exports = mongoose.model( "User", userSchema);

