const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    userName : {
        type:String,
        required:[true, "user name is required"]

    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique: true
    },
    password:{
        type:String,
        required:[true, "password is required"],
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, "phone number is required"]
    },
    usertype:{
        type:String,
        required:[true, "user type is required"],
        default: "client",
        enum:["client", "admin", "vendor", "driver"]
    },
    profile:{
        type:String,
        //default: imag link 
    }
},{timstamps:true})

module.exports = mongoose.model("user", userSchema);