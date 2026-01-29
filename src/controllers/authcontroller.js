const User = require("../models/user");
const {validateSignUp, validateLogin } =require("../utils/validation")

exports.signUp =async(req, res) =>{
    try {


        validateSignUp(req.body);

        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser)
            return res.status(400).json({
                message:"User already exists"
            });

        const createUser = new User({
            name, 
            email, 
            password,
            role
        });

        await createUser.save();

        res.status(201).json({
            success: true,
            message:"User registered successfully.Please login",
        });

    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message,
        });
    }
};

exports.login = async ( req, res) =>{

    try {

        validateLogin(req.body);

        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                succes:false,
                message:"Invalid credentials"
            })
        };

        const validpassword =await  user.comparePassword(password);

        if(!validpassword){
            return res.status(401).json({
                succes:false,
                message:"Invalid credentials"
            })
        };
 
        const token = await user.getJwt();

        return res.status(200).json({
            success: true,
            message:"User is successfully logged In"
    })
} catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    };

};