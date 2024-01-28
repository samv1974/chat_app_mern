const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async()=>{
    console.log("db connection successful")
}).catch((err)=>{
    console.log(err.message)
});

const server = app.listen(process.env.PORT,() => {
    console.log(`server started on port ${process.env.PORT}`);
});
// ok server start listening for requests now And, by the way, listen on the port number specified in the environment variable PORT
// process.env provides access to environment variable of current process



