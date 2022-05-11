const mongoose = require("mongoose");
(bcrypt = require("bcryptjs")), (jwt = require("jsonwebtoken"));

const userStats = new mongoose.Schema(
    {
		posts: {
			type: Number,
			trim: true,
			default: 0
		},
		likes: {
			type: Number,
            default: 0
		},
		comments: {
			type: Number,
            default: 0
		},
		followers: {
			type: Number,
            default: 0
        },
		following: {
			type: Number,
            default: 0
        },
		createdAt: {
			type: Date,
			default: Date.now
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            unique: true,
            required: true
        }
	},
	// { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

//enable post virtual for user
// userStats.virtual("posts", {
// 	ref: "Post",
// 	localField: "_id",
// 	foreignField: "userId",
// 	justOne: false
// });

module.exports = new mongoose.model("UserStats", userStats);
