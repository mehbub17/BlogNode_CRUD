const express = require("express");
const path = require("path");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const mongoose = require("mongoose");
const { json } = require("stream/consumers");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication.js");

const Blog = require("./models/blog.js");

const app = express();
const PORT = 8000;

app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({extended:true})); //for form data
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


mongoose.connect("mongodb://127.0.0.1:27017/bloggers").then((e) => {
  console.log("MongoDB is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/blog", blogRoute);
app.use("/user", userRoute);



app.get("/",async (req, res) => {

  const allBlogs = await Blog.find({});

  res.render("home",{
    user:req.user,
    blogs:allBlogs,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
