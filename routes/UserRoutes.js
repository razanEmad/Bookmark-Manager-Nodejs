const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddleWare.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
    if(!req.body){
        res.status(400).json({status:'error', message:"User credentials are required"})
    }
    else{
        bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        .then((newUser) => {
            res.status(201).json({status:'success', data: {newUser}});
        })
        .catch((err) => {
            res.status(500).json({status:'error', message: err.message});
        })}
        )

    
}});

userRouter.post("/login", (req, res) => {
    if(!req.body){
        res.status(400).json({status:'error', message:"User credentials are required"})
    }
    else{
        User.findOne({email: req.body.email})
            .then((user) => {
                if(!user){
                    res.status(401).json({status:'error', message:"Invalid credentials"})
                }
                else{
                    bcrypt.compare(req.body.password, user.password)
                        .then((isMatch) => {
                            if(isMatch){
                                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
                                res.status(200).json({status:'success', data: {user, token}});
                            }
                            else{
                                res.status(401).json({status:'error', message:"Invalid credentials"})
                            }
                        }).catch((err) => {
                            res.status(500).json({status:'error', message: err.message});
                        })
                }
            })
            .catch((err) => {
                res.status(500).json({status:'error', message: err.message});
            })

    }
})
module.exports = userRouter;