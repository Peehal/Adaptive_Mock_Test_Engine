const express = require("express");
const topicRouter = express.Router();
const {userAuth} = require("../middlewares/auth.middleware");
const {createTopic} = require("../controllers/topiccontroller")

topicRouter.post("/topic", userAuth, createTopic);

module.exports= topicRouter;