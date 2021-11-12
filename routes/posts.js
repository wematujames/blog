const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getCreatePost,
} = require("../controllers/posts");

router.route("/create").get(getCreatePost).post(createPost);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
