const Topic = require("../models/topic");

exports.createTopic = async(req, res) =>{

    try {
        

        const {subjectName, subTopics, difficultyLevel } = req.body;
        if(!subjectName){
            res.status(400).json({
                success:false,
                message:"subjectName is required"

            });
        }

        const topic = await Topic.create({
            userId:req.user.id,
            subjectName,
            subTopics,
            difficultyLevel,
        });

        res.status(200).json({
            success:true,
            message:"Topic created successfully",
            topic,
        })

    } catch (error) {
        res.status(500).json({
            message:"Failed to create topic",
            error:error.message,
        });
    }
};
