const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const { ensureAuthorized, ensureGuest } = require("../middleware/authorize");

const {} = require("../controllers/comments");

module.exports = router;
