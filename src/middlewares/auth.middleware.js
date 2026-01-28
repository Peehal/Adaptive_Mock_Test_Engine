const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req, res , next) =>{
    try {
        

        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({
                 message: "Not authorized, token missing"
            })
        }

        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

        const {_id} = decodedObj;

        const user = await User.findById(_id)

        if(!user){
            return res.status(401).json({
                message:"Invalid User"
            });
        }

        req.user= user;
        next();

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

module.exports = {userAuth};