const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = new mongoose.model("Comment", commentSchema);
