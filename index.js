const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connection/url");
const { handleGetRedirectURLs } = require("./controllers/url");
const app = express();

const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("DB connected...")
);
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", handleGetRedirectURLs);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
