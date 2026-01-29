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

exports.updatePassword = async(req, res) =>{
    try {
        const {currentpassword, newpassword} = req.body;

        if(!currentpassword || !newpassword){
            return res.status(400).json({
                message:"Both current and new password are required",
            })
        }

        const user = await User.findById(req.user._id).select("+password"); //doubt

        const comparePassword = await user.comparePassword(currentpassword);

        if(!comparePassword){
            return res.status(401).json({
                message:"Current password is incorrect",
            })
        }

        user.password= newpassword;
            await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });


    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}