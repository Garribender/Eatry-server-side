const userModel = require("../models/userModel");

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
    return res.staus(500).send({
        success:false,
        message:"Email already Registered please login"
        
    })
}     
//create new user
const user = await userModel.create({
    userName,
    email,
    password,
    address,
    phone, 
});
res.status(201).send({
    success:true,
    message: "Successfully Registered",
    user,
});
    } catch (error) {
        console.log(error)
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
        const  user = await userModel.findOne({ email:email, password: password});
        if(!user){
            return res.status(404).send({
                success:false,
                message: "User not Found"
            })
        }
        res.status(200).send({
            success:true,
            message:"login successful",
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