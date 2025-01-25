const express = require("express");
const path = require("path");
const userRoute = require("./routes/user.js");

const mongoose = require("mongoose");
const { json } = require("stream/consumers");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication.js");

const app = express();
const PORT = 8000;


app.use(express.urlencoded({extended:true})); //for form data
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


mongoose.connect("mongodb://127.0.0.1:27017/bloggers").then((e) => {
  console.log("MongoDB is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoute);


app.get("/", (req, res) => {
  res.render("home",{
    user:req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
