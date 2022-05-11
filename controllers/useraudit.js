const Post = require("../models/Post"),
    ErrorResponse = require("../utils/ErrorResponse"),
    asyncHandler = require("../middleware/asyncHandler"),
    UserStats = require("../models/UserStats");

//Desc                      //Get all Posts
//Route                     //GET /api/v1/posts
//Require Auth              //False
exports.getStats = asyncHandler(async (req, res, next) => {
    const stats = await User.findOne({ userId: req.user.id })
    res.status(200).json({ success: true, stats });
});

// //Desc                      //Get all Posts
// //Route                     //GET /api/v1/posts
// //Require Auth              //False
// exports.getStats = asyncHandler(async (req, res, next) => {
	
// });
