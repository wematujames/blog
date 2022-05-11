const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			maxlength: [
				150,
				"Post title cannot be greather than 150 characters"
			],
			required: [true, "Please a title for your post"]
		},
		body: {
			type: String,
			required: [true, "Please add a body to your post"]
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", 
			required: true
		},
		pictures: {
			photo: {
				type: String
			},
			description: {
				type: String,
				maxlength: [
					100,
					"Picture description cannot be more than 100 characters"
				]
			}
		},
		likes: {
			type: Number,
			default: 0
		},
		dislikes: {
			type: Number,
			default: 0
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// enable comments virtual for post
postSchema.virtual("comments", {
	ref: "Comment",
	localField: "_id",
	foreignField: "postId",
	justOne: false
});

module.exports = new mongoose.model("Post", postSchema);
