const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = new mongoose.model("Comment", commentSchema);
