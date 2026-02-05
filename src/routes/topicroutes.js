import express from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import {
  createTopic,
  getAllTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topiccontroller.js";

const topicRouter = express.Router();

topicRouter.post("/topic", userAuth, createTopic);
topicRouter.get("/getalltopic", userAuth, getAllTopic);
topicRouter.put("/updatetopic", userAuth, updateTopic);
topicRouter.delete("/deletetopic", userAuth, deleteTopic);

export default topicRouter;
