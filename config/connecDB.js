require("dotenv").config({ path: true });
const mongoose = require("mongoose");

const connectDB = async () => {
	const mongoURI =
		process.env.NODE_ENV === "development"
			? process.env.MONGO_URI_LOCAL
			: process.env.MONGO_URI;

	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	console.log(`Connected: ${conn.connection.host}`.blue.inverse);
};

module.exports = connectDB;
