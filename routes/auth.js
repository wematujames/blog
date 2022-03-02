const express = require("express");
const { route } = require(".");
const router = express.Router();

const {
	authWithGoogle,
	authWithGoogleCallback,
	authWithFacebook,
	authWithFacebookCallback
} = require("../controllers/auth");

const {
	getRegister,
	getSignIn,
	registerUser,
	signInUser
} = require("../controllers/users");

//local auth
router.route("/register").get(getRegister).post(registerUser);
router.route("/login").get(getSignIn).post(signInUser);
router.route("/signin").get(getSignIn).post(signInUser);

//auth with google
router.get("/google", authWithGoogle);
router.get("/google/callback", authWithGoogleCallback);

//auth with facebook
router.get("/facebook", authWithFacebook);
router.get("/facebook/callback", authWithFacebookCallback);

module.exports = router;
