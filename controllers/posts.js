const Post = require("../models/Post"),
	ErrorResponse = require("../utils/ErrorResponse"),
	asyncHandler = require("../middleware/asyncHandler"),
	Comment = require("../models/Comment"),
	path = require("path");

//Desc                      //Get all Posts
//Route                     //GET /api/v1/posts
//Require Auth              //False
exports.getPosts = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advRes);
});

//Desc                      //Create a Post
//Route                     //POST /api/v1/posts
//Require Auth              //True
exports.createPost = asyncHandler(async (req, res, next) => {
	//Add user to Post fields
	req.body.author = req.user.id;

	const post = await Post.create(req.body);

	res.status(200).json({
		success: true,
		msg: "Post created successfully",
		post
	});
});

//Desc                      //Get a Post
//Route                     //GET /api/v1/posts/:id
//Require Auth              //False
exports.getPost = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id);

	if (!Post) {
		return next(
			new ErrorResponse(
				404,
				`Post not found`,
				`No Post with specified id: ${req.params.id}`
			)
		);
	}

	res.status(200).json({
		success: true,
		post
	});
});

//Desc                      //Update a Post
//Route                     //PUT /api/v1/posts/:id
//Require Auth              //True
exports.updatePost = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id);

	if (!Post) {
		return next(
			new ErrorResponse(
				404,
				`Post could not be updated`,
				`No Post with specified id: ${req.params.id}`
			)
		);
	}

	//Make sure user is the owner of Post
	if (Post.user.toString() !== req.user.id) {
		return next(
			new ErrorResponse(
				401,
				`Unathorized: Cannot update Post`,
				`User:${req.user.id} is not the owner of this Post`
			)
		);
	}

	post = await Post.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		success: true,
		msg: `Successfully updated Post with id: ${req.params.id}`,
		post
	});
});

//Desc                      //Delete a Post
//Route                     //DELETE /api/v1/Posts/:id
//Require Auth              //True
exports.deletePost = asyncHandler(async (req, res, next) => {
	let Post = await Post.findById(req.params.id);

	if (!Post) {
		return next(
			new ErrorResponse(
				404,
				`Post could not be deleted`,
				`No Post with specified id: ${req.params.id}`
			)
		);
	}

	//Make sure user is the owner of Post
	if (Post.user.toString() !== req.user.id) {
		return next(
			new ErrorResponse(
				401,
				`Unathorized: Cannot delete Post`,
				`User:${req.user.id} is not the owner of this Post`
			)
		);
	}

	Post.remove();

	res.status(200).json({
		success: true,
		msg: `Post with id: ${req.params.id} deleted successfully`,
		data: {}
	});
});

//Desc                      //Get Post within radius of zipcode
//Route                     //GET /api/v1/Posts/raduis/:zipcode/:distance
//Require Auth              //False
// exports.getPostWithRadius = asyncHandler(async (req, res, next) => {
// 	const { zipcode, distance } = req.params;

// 	const loc = await geocoder.geocode(zipcode);

// 	const radius = distance / 3963;

// 	const lon = loc[0].longitude;
// 	const lat = loc[0].latitude;

// 	const Posts = await Post.find({
// 		location: {
// 			$geoWithin: { $centerSphere: [[lon, lat], radius] }
// 		}
// 	});

// 	res.status(200).json({
// 		success: true,
// 		count: Posts.length,
// 		data: Posts
// 	});
// });

//Desc                      //Delete a Post
//Route                     //DELETE /api/v1/Posts/:id/photo
//Require Auth              //True
// exports.PostPhotoUpload = asyncHandler(async (req, res, next) => {
// 	let Post = await Post.findById(req.params.id);

// 	if (!Post) {
// 		return next(
// 			new ErrorResponse(
// 				404,
// 				`Post not found`,
// 				`No Post with specified id: ${req.params.id}`
// 			)
// 		);
// 	}

// 	//Make sure user is the owner of Post
// 	if (Post.user.toString() !== req.user.id) {
// 		return next(
// 			new ErrorResponse(
// 				401,
// 				`Unathorized: Cannot update Post with photo`,
// 				`User:${req.user.id} is not the owner of this Post`
// 			)
// 		);
// 	}
// 	//Check if file was uploaded
// 	if (!req.files) {
// 		return next(
// 			new ErrorResponse(
// 				400,
// 				`Please upload an image`,
// 				`No image uploaded`
// 			)
// 		);
// 	}
// 	const file = req.files.file;

// 	//Check file type (must be image file)
// 	if (!file.mimetype.startsWith("image")) {
// 		return next(
// 			new ErrorResponse(
// 				400,
// 				`Please upload an image file`,
// 				`A ${path.parse(file.name).ext} was uploaded.`
// 			)
// 		);
// 	}

// 	//Check files size
// 	if (file.size > process.env.MAX_UPLOAD_LIMIT) {
// 		return next(
// 			new ErrorResponse(
// 				404,
// 				`Please upload a image of size not greater than 1Mb`,
// 				`Image size ${file.size} greater than 1Mb`
// 			)
// 		);
// 	}

// 	//Set custom filename
// 	file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

// 	//Save to uploads folder
// 	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, err => {
// 		if (err) {
// 			console.err(err);
// 			return next(
// 				new ErrorResponse(500, `Problem uploading file`, `Server Error`)
// 			);
// 		}
// 		res.status(200).json({
// 			success: true,
// 			fileUrl: `http://localhost:3000/uploads/${file.name}`
// 		});
// 	});
// });
