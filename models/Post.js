const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [150, "Post title cannot be greather than 150 characters"],
    required: [true, "Please a title for your post"],
  },
  body: {
    type: String,
    required: [true, "Please add a body to your post"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  metaData: {
    comments: {
      number: {
        type: Number,
        default: 0,
      },
      msg: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
          },
          comment: {
            type: String,
          },
          createdAT: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("Post", postSchema);
