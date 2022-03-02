const express = require("express");
const router = express.Router({ mergeParams: true });
const { ensureAuthorized, ensureGuest } = require("../middleware/authorize");

const {
	createPost,
	getPost,
	updatePost,
	deletePost,
	getCreatePost
} = require("../controllers/posts");

router.route("/createpost").get(getCreatePost).post(createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
