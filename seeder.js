require("dotenv").config({ path: "./config/config.env" });
const fs = require("fs"),
  connectDB = require("./config/connectDB"),
  colors = require("colors"),
  Bootcamp = require("./models/Bootcamp"),
  Course = require("./models/Course");
User = require("./models/User");

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`) //Read data from bootcamps json file
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`) // Read data in courses json file
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`) // Read data in users json file
);

connectDB();

//Import data to DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
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
    await Bootcamp.deleteMany();
    await Course.deleteMany();
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
