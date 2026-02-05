import express from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  updatePassword,
  logout,
} from "../controllers/usercontroller.js";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, getProfile);
profileRouter.put("/update", userAuth, updateProfile);
profileRouter.put("/updatepassword", userAuth, updatePassword);
profileRouter.post("/logout", userAuth, logout);

export default profileRouter;
