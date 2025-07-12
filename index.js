const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const path = require("path");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connection/url");
const { handleGetRedirectURLs } = require("./controllers/url");
const staticRoute = require("./routes/staticRoutes");
const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("DB connected...")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.get("/test", (req, res) => {
//   return res.render("home");
// });

app.use(express.json());
app.use("/url", urlRoute);
app.use("/", staticRoute);
app.get("/:shortId", handleGetRedirectURLs);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
