const express = require("express");
const app = express();
const connectDB = require("./config/database");



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

    