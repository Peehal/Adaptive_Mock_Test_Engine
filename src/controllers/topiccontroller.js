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

exports.getAllTopic = async(req, res) =>{
    try {
        
        const topics = await Topic.find({
            userId:req.user.id,
        });

        res.status(200).json(topics)
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
};

exports.updateTopic = async(req, res) => {

    try {
        
        const {topicId, subjectName, subTopics, difficultyLevel } = req.body;
        if (!topicId){
            return res.status(400).json({
                success:false,
                message:"topicId is required"
            });
        }

        const topic = await Topic.findOneAndUpdate(
           { _id:topicId, userId:req.user.id},

            {subjectName,
            subTopics,
            difficultyLevel},

            {new:true},
        )

        if(!topic){
            return res.status(404).json({
                message:"Topic not found"
            })
        }

        res.status(200).json({
            success:true, 
            topic
        })


    } catch (error) {
         res.status(500).json({ message: error.message });
    }

}

exports.deleteTopic = async(req, res) =>{
    
    const {topicId, subjectName} = req.body;
    
    if(!topicId){
        return res.status(400).json({
            message:"topicId is required",
        })
    }

    const topic = await Topic.findOneAndDelete({
        _id:topicId,
        userId:req.user.id,
    });

    if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
    }

    res.json({
        message:"Topic deleted successfully"
    })
};

