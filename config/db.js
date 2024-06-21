const mongoose = require("mongoose");
const colors = require("colors");

//mongodb function
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to Database ${mongoose.connection.host}`, colors.bgCyan);
    } catch (error) {

        console.log("Db error", error,);
    }
}


module.exports = connectDb;