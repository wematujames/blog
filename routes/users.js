const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const {
  getRegister,
  getSignIn,
  registerUser,
  signInUser,
} = require("../controllers/users");

//router requests for post for a specific user
router.use("/:id/posts", postsRouter);

router.route("/signup").get(getRegister).post(registerUser);

router.route("/signin").get(getSignIn).post(signInUser);

module.exports = router;
