const express = require("express");
const BookmarkRouter=require("./routes/BookmarkRouter.js");
const UserRouter = require("./routes/UserRoutes.js");
const mongoose = require("mongoose");

const app = express();
const dns = require("dns");
require("dotenv").config();

app.use(express.json());

// set dns manually to 
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MongoURL = process.env.MONGODB_URL;

mongoose.connect(MongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Routes 
app.use("/bookmarks", BookmarkRouter);
app.use("/users", UserRouter);

app.use((req, res) => {
    res.status(404).send("Not Found");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})