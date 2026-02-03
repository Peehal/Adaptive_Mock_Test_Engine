const express = require("express");
const topicRouter = express.Router();
const {userAuth} = require("../middlewares/auth.middleware");
const {createTopic, getAllTopic, updateTopic, deleteTopic} = require("../controllers/topiccontroller")

topicRouter.post("/topic", userAuth, createTopic);
topicRouter.get("/getalltopic", userAuth, getAllTopic);
topicRouter.put("/updatetopic", userAuth, updateTopic); 
topicRouter.delete("/deletetopic", userAuth, deleteTopic); 

module.exports= topicRouter;