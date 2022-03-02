const User = require("../models/User"),
	asyncHandler = require("../middleware/asyncHandler");

//Desc                      //Get all users
//Route                     //GET /api/v1/auth/users
//Require Auth              //True
exports.getUsers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advRes);
});

//Desc                      //Create a user
//Route                     //POST /api/v1/auth/users
//Require Auth              //True
exports.createUser = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	res.status(201).json({
		success: true,
		msg: "User created",
		data: user
	});
});

//Desc                      //Get a user
//Route                     //GET /api/v1/auth/users/:id
//Require Auth              //True
exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	res.status(200).json({
		success: true,
		data: user
	});
});

//Desc                      //Update a user
//Route                     //PUT /api/v1/auth/users/:id
//Require Auth              //True
exports.updateUser = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		success: true,
		msg: "User update successful",
		data: user
	});
});

//Desc                      //Delte a user
//Route                     //DELETE /api/v1/auth/users/:id
//Require Auth              //True
exports.deleteUser = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);

	res.status(200).json({
		success: true,
		msg: "User successfully deleted",
		data: {}
	});
});
