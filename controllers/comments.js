const Comment = require("../models/Comment"),
	asyncHandler = require("../middleware/asyncHandler"),
	ErrorResponse = require("../utils/ErrorResponse"),
	Post = require("../models/Post");

//Desc                      //Get all Comments for a post
//Route                     //GET /api/v1/posts/:postId/comments
//Require Auth              //False
exports.getCommentsForPost = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advRes);
});

//Desc                      //Create a comment
//Route                     //POST /api/v1/posts/:postId/comments
//Require Auth              //True
exports.createComment = asyncHandler(async (req, res, next) => {
	res.send("route hit");
	//Add bootcamp and user identifiers for course
	// req.body.post = req.params.postId;
	// req.body.user = req.user.id;

	// //Create course for bootcamp
	// const comment = await Comment.create(req.body);

	// res.status(201).json({
	// 	success: true,
	// 	msg: "Comment created successfully",
	// 	comment
	// });
});

//Desc                      //Update a comment
//Route                     //PUT /api/v1/comments/:id
//Require Auth              //True
exports.updateComment = asyncHandler(async (req, res, next) => {
	let comment = await Comment.findById(req.params.id);

	//Check if user is owner of course
	if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
		return next(
			new ErrorResponse(
				401,
				`Anauthorized: Cannot edit comment`,
				`User ${req.user.id} not owner of bootcamp`
			)
		);
	}

	comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		success: true,
		comment
	});
});

//Desc                      //Delete a comment
//Route                     //DELETE /api/v1/comments/:id
//Require Auth              //True
exports.deleteComment = asyncHandler(async (req, res, next) => {
	let comment = await Comment.findById(req.params.id);

	//Check if user is owner of course
	if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
		return next(
			new ErrorResponse(
				401,
				`Anauthorized: Cannot delete for cannot delete comment`,
				`User ${req.user.id} not creator of this comment`
			)
		);
	}

	comment.remove();

	res.status(200).json({
		success: true,
		msg: "Comment removed successfully",
		data: {}
	});
});
