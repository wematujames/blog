const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const https = require("https");

//some middleware
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Schema for posts
const postSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String,
  searchString: String,
  postInfo: {
    authorName: String,
    postDate: String,
    likes: Number,
    disLikes: Number,
    comments: [],
  },
});
//Schema for users
const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});
const User = new mongoose.model("user", userSchema);
const Post = new mongoose.model("post", postSchema);
//routes

//Create Post
app
  .route("/createpost")
  .get((req, res) => {
    res.render("createpost");
  })
  .post((req, res) => {
    const newPost = new Post({
      postTitle: req.body.postTitle,
      postContent: req.body.postContent,
      searchString: req.body.postTitle.replace(/ /g, "-").replace(/[?=]/g, ""),
      postInfo: {
        authorName: req.body.authorName,
        postDate: new Date().toLocaleString(),
        likes: 0,
        disLikes: 0,
        comments: [],
      },
    });
    newPost.save();
    res.redirect("/");
  });

//Search Post
app.get("/post/:postSearch", (req, res) => {
  Post.findOne({ searchString: req.params.postSearch }, (err, post) => {
    if (err) {
      res.send("There was an err");
      console.log(err);
    } else {
      res.render("post", { post: post });
    }
  });
});
//Sign In
app
  .route("/signin")
  .get((req, res) => {
    res.render("signin");
  })
  .post((req, res) => {
    res.render("signin");
  });
//Sign Up
app
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post((req, res) => {
    const newUser = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
    });
    newUser.save();
    res.redirect("/");
  });
//Comment
app.post("/comment", (req, res) => {
  // res.render("index")
  res.send("Thanks for commenting");
});
//Subcribe to newsletter
app.post("/newslettersignup", (req, res) => {
  const { firstName, lastName, emailAddress } = req.body;

  const requestData = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(requestData);
  const url = "https://us2.api.mailchimp.com/3.0/lists/74b989e3f6";
  const options = {
    method: "POST",
    auth: `ubiquitous:${process.env.API_KEY}`,
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
    if (response.statusCode === 200) {
      // alert("Success")
    } else {
      // alert("Unable to process your request at this time. Please try again later.")
    }
  });
  request.write(jsonData);
  request.end();
  res.redirect("/");
});

app.get("/cms", (req, res) => {
  res.render("cms");
});

app.get("*", (req, res) => {
  res.write("<h1> 404 Error</h1>");
  res.write("<h4> The page your are looking for does not exist</h4>");
});

//start server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port || 3000, () => {
  console.log(`Server started process.env.PORT || port 3000`);
});
