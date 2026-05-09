const express = require('express');
const Bookmark = require("../models/Bookmark.js");
const authMiddleware = require('../middlewares/authMiddleWare.js');

const BookmarkRouter = express.Router();

BookmarkRouter.post("/", authMiddleware, (req, res) => {
    if(!req.body){
        res.status(400).json({status:'error', message:"Bookmark data is required"}) 
    }
    else{
        Bookmark.create({   
            title: req.body.title,
            url: req.body.url,
            userId: req.user.id
        })
        .then((newBookmark) => {
            res.status(201).json({status:'success', data: {newBookmark}});
        })
        .catch((err) => {
            res.status(500).json({status:'error', message: err.message});
        });
    }
});

BookmarkRouter.get("/", authMiddleware, (req, res) => {
    Bookmark.find({email: req.user.email})  
        .then((bookmarks) => {  
            res.status(200).json({status:'success', data: {bookmarks}});
        })
        .catch((err) => {
            res.status(500).json({status:'error', message: err.message});
        });     
});

BookmarkRouter.get("/:id", authMiddleware, (req, res) => {
    Bookmark.findOne({_id: req.params.id, email: req.user.email})  
        .then((bookmark) => {   
            if(bookmark){
                res.status(200).json({status:'success', data: {bookmark}});
            }
            else{
                res.status(404).json({status:'error', message: "Bookmark not found"});
            }
        })
        .catch((err) => {
            res.status(500).json({status:'error', message: err.message});
        });
});

BookmarkRouter.patch("/:id", authMiddleware, (req, res) => {
    if(!req.body){
        res.status(400).json({status:'error', message:"Bookmark data is required"})
    }
    else{
        Bookmark.findOneAndUpdate({_id: req.params.id, email: req.user.email}, req.body, {new: true})   
        .then((updatedBookmark) => {
            if(updatedBookmark){
                res.status(200).json({status:'success', data: {updatedBookmark}});
            }
            else{
                res.status(404).json({status:'error', message: "Bookmark not found"});
            }
        })
        .catch((err) => {
            res.status(500).json({status:'error', message: err.message});
        });
    }
});


BookmarkRouter.delete("/:id", authMiddleware, (req, res) => {
    Bookmark.findOneAndDelete({_id: req.params.id, email: req.user.email})  
        .then((deletedBookmark) => {    
            if(deletedBookmark){
                res.status(200).json({status:'success', data: {deletedBookmark}});
            }
            else{
                res.status(404).json({status:'error', message: "Bookmark not found"});
            }
        })
        .catch((err) => {
            res.status(500).json({status:'error', message: err.message});
        });
});

module.exports = BookmarkRouter;