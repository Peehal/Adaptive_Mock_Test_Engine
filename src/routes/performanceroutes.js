import express from "express";
import { getPerformanceAnalysisAPI } from "../controllers/performancecontroller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const performanceRouter = express.Router();

performanceRouter.get("/analysis/:mockTestId", userAuth, getPerformanceAnalysisAPI);

export default performanceRouter;
