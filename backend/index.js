// App Setup
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const PORT = 4000;
const app = express();
const ENV = process.env.ENVIRONMENT 

if (ENV === "DEV") {
    app.use(cors())
}

app.use(express.json())
app.listen(PORT,() => { 
    console.log(`App Listening on port ${PORT}`); 
    console.log(`Running the in ${ENV} Environment`);
    
})

const authRouter = require("./api/AuthHandler");
app.use("/api/auth", authRouter);