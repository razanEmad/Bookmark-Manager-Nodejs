// 1. require modules
const mongoose = require("mongoose");


// 2.define schema

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Bookmark title is required"],
        trim: true,
        minlength: [3, "Bookmark title must be at least 3 characters long"],
    },
    url:{
        type: String,
        trim: true,
        required:true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    category: {
        type: String,
        enum: {
            values: ["Article", "Video", "Tool"],
            message: "you must choose (Article, Video , Tool)"
        },
        default: "Article"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Bookmark user is required"]
    }
}, {
    timestamps: true
});



// 3. model
const Bookmark = mongoose.model('Bookmark', bookmarkSchema)


// 4. export model
module.exports = Bookmark;