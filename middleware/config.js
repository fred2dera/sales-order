const dotenv = require("dotenv");
dotenv.config();

module.exports.sessionConfig = {
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
}