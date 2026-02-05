import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import events from "events";

import connectDB from "./config/database.js";
import ollama from "./utils/ollama.js";

// Routers
import authRouter from "./routes/authroutes.js";
import profileRouter from "./routes/userrouter.js";
import topicRouter from "./routes/topicroutes.js";
import mockTestRouter from "./routes/mocktestroutes.js";

dotenv.config();

events.EventEmitter.defaultMaxListeners = 20;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes (all used exactly as '/')
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", topicRouter);
app.use("/", mockTestRouter);

// Connect to DB & start server
connectDB()
  .then(() => {
    console.log("Database has successfully connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is running successfully on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
