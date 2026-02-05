import express from "express";
import { signUp, login } from "../controllers/authcontroller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

export default authRouter;
