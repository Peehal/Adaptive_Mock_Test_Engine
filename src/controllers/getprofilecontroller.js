const {userAuth} = require("../middlewares/auth.middleware");

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