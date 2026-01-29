const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
require('dotenv').config();


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authroutes");
const getProfile = require("./routes/userrouter");
const updateProfile = require("./routes/userrouter");
const updatePassword = require("./routes/userrouter");



app.use("/", authRouter);
app.use("/", getProfile);
app.use("/", updateProfile);
app.use("/", updatePassword);



connectDB()
    .then( () => {
        console.log("Database has Successfully connected");
        app.listen(process.env.PORT, () =>{
            console.log("Server is running Successfully");
        })
    })
    .catch((error) => {
        console.log("Database is not connected successfully");
    });

    