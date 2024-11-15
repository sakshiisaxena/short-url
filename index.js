const express = require('express');
const app = express();
const PORT = 8001;

const urlRoute = require('./routes/url');
const URL = require('./models/url')
const { connectDB } = require('./connection');

connectDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("mongoDB connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
        shortId
        }, 
        { 
            $push: { visitHistory: {timestam: Date.now()}}
        } 
    );
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));