const express = require("express");
const profileRouter = express.Router();

const {userAuth } = require("../middlewares/auth.middleware");
const {getProfile,updateProfile } = require("../controllers/usercontroller");

profileRouter.get("/profile", userAuth, getProfile );
profileRouter.put("/update", userAuth, updateProfile );

module.exports = profileRouter;