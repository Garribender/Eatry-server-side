const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
//register user
const registerController = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
            phone,
            address
        } = req.body
// user validation
if(!userName || !email || !password || !address || !phone){
    return res.status(500).send({
        success:false,
        message:"please provide all fields"

    })
}     
// validate existing user
const existing = await userModel.findOne({ email })
if(existing){
    return res.status(500).send({
        success:false,
        message:"Email already Registered please login"
        
    })
}    

//hash password
var salt = bcrypt.genSaltSync(10);
const hashedPassword = await bcrypt.hash(password, salt)
//create new user
const user = await userModel.create({
    userName,
    email,
    password : hashedPassword,
    address,
    phone, 
});
res.status(201).send({
    success:true,
    message: "Successfully Registered",
    user,
});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Register Api",
            error  
        })
    }
};

//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validate
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message: "please return Email or Password"
            })
        }
        //check userr
        const  user = await userModel.findOne({ email:email, password: password });
        if(!user){
            return res.status(404).send({
                success:false,
                message: "User not Found"
            })
        }
        //check user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success:false,
                message:"invalid credentials",
            });
        }
        //token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {
             expiresIn: "5d",
        })
          
        user.password = undefined; 
        res.status(200).send({
            success:true,
            message:"login successful",
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login API",
            error
        })
    }
};

module.exports = { registerController, loginController };