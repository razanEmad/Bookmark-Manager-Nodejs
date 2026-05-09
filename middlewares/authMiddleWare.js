const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const authkey = req.headers.authorization;
    if(!authkey){
        res.status(401).json({status:'error', message:"Unauthenticated user"});
    }
    else{
        const token = authkey.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
            }
        };


module.exports = authMiddleware;