require("dotenv").config({ path: "./config/config.env" });
const fs = require("fs"),
	connectDB = require("./config/connectDB"),
	colors = require("colors"),
	Post = require("./models/Post"),
	Comment = require("./models/Comment"),
	User = require("./models/User");

const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/posts.json`) //Read data from posts json file
);

const courses = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/comments.json`) // Read data in comments json file
);

const users = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/users.json`) // Read data in users json file
);

connectDB();

//Import data to DB
const importData = async () => {
	try {
		await Bootcamp.create(posts);
		await Course.create(comments);
		await User.create(users);
		console.log(`Data imported...`.green.inverse);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

//Delete all data in DB
const deleteData = async () => {
	try {
		await Post.deleteMany();
		await Comment.deleteMany();
		await User.deleteMany();
		console.log(`Data deleted...`.red.inverse);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

if (process.argv[2] === "-i") {
	importData();
} else if (process.argv[2] === "-d") {
	deleteData();
}
