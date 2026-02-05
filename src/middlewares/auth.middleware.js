import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, token missing",
            });
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decodedObj;

        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                message: "Invalid User",
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export { userAuth };
