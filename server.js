require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const ejs = require("ejs");
const colors = require("colors");
const connectDB = require("./config/connecDB");

//connect to DB
connectDB();

//Middleware
app.use(express.static("Public")); // Set static folder
app.set("view engine", "ejs"); //Set view engine
app.use(express.urlencoded({ extended: true })); //accept form data
app.use(express.json()); // accept json data

//Routes
app.use("/", require("./routes"));
app.use("/", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));

//start server
app.listen(process.env.PORT || 5000, () => {
	console.log(
		`Server started in ${process.env.NODE_ENV} on port ${process.env.PORT}`
	);
});
