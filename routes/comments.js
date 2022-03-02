const express = require("express"),
	router = express.Router({ mergeParams: true }),
	advRes = require("../middleware/advRes"),
	Comment = require("../models/Comment"),
	{ protect, authorize } = require("../middleware/auth"),
	{
		getCommentsForPost,
		createComment,
		updateComment,
		deleteComment
	} = require("../controllers/comments");

router
	.route("/")
	.get(advRes(Comment), getCommentsForPost)
	.post(protect, authorize("publisher", "admin"), createComment);

router
	.route("/:id")
	.put(protect, authorize("publisher", "admin"), updateComment)
	.delete(protect, authorize("publisher", "admin"), deleteComment);

module.exports = router;
