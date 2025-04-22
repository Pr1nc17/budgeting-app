const express = require("express")
const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
    const loginDetails = req.headers.auth
    
    let username, password;
    try {
        const [b64Username, b64Password] = loginDetails.split(':')
        username = atob(b64Username)
        password = atob(b64Password)
    } catch (err) {
        res.statusCode = 400;
        res.send("Login Failed");
        console.log("Invalid Login Auth Header")
        return
    }

    if (username === "user" && password === "password") {
        res.statusCode = 200;
        res.setHeader('token', atob('JWTOrOtherToken'))
        res.send("login ok");
    } else {
        res.statusCode = 400;
        res.send("Login Failed");
    }
});

module.exports = authRouter;