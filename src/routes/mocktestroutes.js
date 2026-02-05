import express from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import { generateMocktest } from "../controllers/mocktestcontroller.js";

const mockTestRouter = express.Router();

mockTestRouter.post("/generatemocktest", userAuth, generateMocktest);

export default mockTestRouter;
