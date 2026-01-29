const express = require("express");
const profileRouter = express.Router();

const {userAuth } = require("../middlewares/auth.middleware");
const {getProfile,updateProfile, updatePassword, logout } = require("../controllers/usercontroller");



profileRouter.get("/profile", userAuth, getProfile );
profileRouter.put("/update", userAuth, updateProfile );
profileRouter.put("/updatepassword", userAuth, updatePassword );
profileRouter.post("/logout", userAuth, logout );


module.exports = profileRouter;