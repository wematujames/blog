const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const { ensureAuthorized, ensureGuest } = require("../middleware/authorize");

const {
	getRegister,
	getSignIn,
	registerUser,
	signInUser
} = require("../controllers/users");

module.exports = router;
