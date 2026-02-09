import express from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import { generateMocktest } from "../controllers/mocktestcontroller.js";
import { submitMockTest } from "../controllers/mocktestcontroller.js";
import { generateAdaptiveMock } from "../controllers/mocktestcontroller.js";

const mockTestRouter = express.Router();

mockTestRouter.post("/generatemocktest", userAuth, generateMocktest);
mockTestRouter.post("/submitMockTest", userAuth, submitMockTest);
mockTestRouter.post("/generateadaptivemock", userAuth, generateAdaptiveMock);

export default mockTestRouter;
