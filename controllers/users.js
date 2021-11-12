const User = require("../models/User");

//desc            get register page
//route           GET /users/register
//requireAuth     False
exports.getRegister = (req, res, next) => {
  res.render("signup");
};

//desc            Register user
//route           Post /users/register
//requireAuth     False
exports.registerUser = async (req, res, next) => {
  //Create user
  const user = await User.create(red.body);

  res.redirect("/");
};

//desc            get sign in page
//route           GET /users/signin
//requireAuth     False
exports.getSignIn = (req, res, next) => {
  res.render("signin");
};

//desc            get sign in page
//route           GET /users/signin
//requireAuth     False
exports.signInUser = (req, res, next) => {
  //Check if user exists

  res.render("/");
};
