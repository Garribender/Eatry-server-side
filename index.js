const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb  = require("./config/db");


//dotenv configuration
dotenv.config();

//DB connect
connectDb();

const app = express();
const PORT = process.env.PORT || 8080;


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/User", require("./routes/userRoutes"));


app.listen(PORT, () => {
    console.log("server app is listening on port" .bgMagenta + PORT )
});