const Post = require("../models/Post");

//desc            get homepage
//route           GET /
//requireAuth     False
exports.getHome = async (req, res, next) => {
  // Posts
  const posts = await Post.find();
  console.log(posts);
  //render home along with posts
  res.render("home", { posts: posts });
};

//desc            get about page
//route           GET /about
//requireAuth     False
exports.getAbout = (req, res, next) => {
  res.render("about");
};

//desc            get contact page
//route           GET /contact
//requireAuth     False
exports.getContact = (req, res, next) => {
  res.render("contact");
};
