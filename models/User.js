const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: [50, "First name cannot be more than 50 characters"],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [50, "Last name cannot be more than 50 characters"],
  },
  userName: {
    type: String,
    required: true,
    maxlength: [50, "Username cannot be more than 50 characters"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password cannot be less than 8 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("User", userSchema);
