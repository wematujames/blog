require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const ejs = require("ejs");
const colors = require("colors");
const connectDB = require("./config/connecDB");
//Routers
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const homeRouter = require("./routes/index");
const bodyParser = require("body-parser");

//connect to DB
connectDB();

//Middleware
app.use(express.static("Public")); // Set static folder
app.set("view engine", "ejs"); //Set view engine
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);

//start server
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server started in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});
