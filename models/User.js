const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			maxlength: [50, "First name cannot be more than 50 characters"]
		},
		lastName: {
			type: String,
			required: true,
			maxlength: [50, "Last name cannot be more than 50 characters"]
		},
		userName: {
			type: String,
			required: true,
			maxlength: [50, "Username cannot be more than 50 characters"]
		},
		email: {
			type: String,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please enter a valid email address"
			]
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlength: [8, "Password cannot be less than 8 characters"]
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	{ toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

//Hash and store password in DB
userSchema.pre("save", async () => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
});

//Check if password match on user login
userSchema.methods.checkPassword = async userEnteredPassword => {
	return await bcrypt.compare(userEnteredPassword, this.password);
};

//enable post virtual for user
userSchema.virtual("posts", {
	ref: "Post",
	localField: "_id",
	foreignField: "userId",
	justOne: false
});

module.exports = new mongoose.model("User", userSchema);
