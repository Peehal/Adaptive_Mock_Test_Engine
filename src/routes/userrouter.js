const express = require("express");
const profileRouter = express.Router();

const {userAuth } = require("../middlewares/auth.middleware");
const {getProfile,updateProfile, updatePassword } = require("../controllers/usercontroller");



profileRouter.get("/profile", userAuth, getProfile );
profileRouter.put("/update", userAuth, updateProfile );
profileRouter.put("/updatepassword", userAuth, updatePassword );


module.exports = profileRouter;