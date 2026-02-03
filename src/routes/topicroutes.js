const express = require("express");
const topicRouter = express.Router();
const {userAuth} = require("../middlewares/auth.middleware");
const {createTopic, getAllTopic} = require("../controllers/topiccontroller")

topicRouter.post("/topic", userAuth, createTopic);
topicRouter.get("/getalltopic", userAuth, getAllTopic);

module.exports= topicRouter;