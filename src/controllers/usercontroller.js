const User = require("../models/user");

exports.getProfile = async(req , res ) =>{
    return res.status(200).json({
        success:true, 
        data:{
            name:req.user.name,
            email:req.user.email,
            totalTestGiven:req.user.totalTestGiven,
            averageScore:req.user.averageScore,

            // AI driven Fields

            strength:req.user.strength || [],
            weaknesses:req.user.weaknesses || [],

            createdAt : req.user.createdAt,
        },
    });
};

exports.updateProfile = async(req, res) => {
    try {
        const allowedFields = ["name", "email"];
    const update = {};

    allowedFields.forEach ( field =>{
        if(req.body[field]){
            update[field] = req.body[field];
        }
    });

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        update,
        {
            new:true,
            runValidators: true,
        }
    );

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data:{
            name:updatedUser.name,
            email:updatedUser.email,
        }
    });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}