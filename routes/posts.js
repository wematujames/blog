const express = require("express"),
	commentsRouter = require("../routes/comments"),
	router = express.Router(),
	advRes = require("../middleware/advRes"),
	Post = require("../models/Post"),
	{ protect, authorize } = require("../middleware/auth"),
	{
		createPost,
		updatePost,
		deletePost,
		getPost,
		getPosts
	} = require("../controllers/posts");

router.use("/:postId/courses", commentsRouter);

router
	.route("/")
	.get(advRes(Post, { path: "comments" }), getPosts)
	.post(protect, authorize("user", "admin"), createPost);

router
	.route("/:id")
	.get(getPost)
	.put(protect, authorize("user", "admin"), updatePost)
	.delete(protect, authorize("user", "admin"), deletePost);

module.exports = router;
