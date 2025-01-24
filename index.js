const express = require("express");
const path = require("path");
const userRoute = require("./routes/user.js");

const mongoose = require("mongoose");
const { json } = require("stream/consumers");

const app = express();
const PORT = 8000;


app.use(express.urlencoded({extended:false})); //for form data
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/bloggers").then((e) => {
  console.log("MongoDB is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoute);


app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
