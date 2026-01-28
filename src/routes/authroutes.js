const express = require("express");
const authRouter = express.Router();

const {signUp, login} = require("../controllers/authcontroller") 

authRouter.post("/signup", signUp)
authRouter.post("/login", login)

module.exports = authRouter;