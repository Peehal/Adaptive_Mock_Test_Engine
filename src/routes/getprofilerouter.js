const express = require("express");
const profileRouter = express.Router();

const {userAuth } = require("../middlewares/auth.middleware");
const {getProfile} = require("../controllers/getprofilecontroller");

profileRouter.get("/profile", userAuth, getProfile );

module.exports = profileRouter;