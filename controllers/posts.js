const Post = require("../models/Post");

//desc            Get all posts / get post for user
//route           GET /posts/ or /users/:id/posts
//requireAuth     True
exports.getPosts = async (req, res, next) => {
  if (req.params.id) {
    const posts = await Post.find({ user: req.params.id });
    res.render("home", { posts: posts });
  } else {
    const posts = await Post.find();
    res.render("post", { post: post });
  }
};

//desc            Get new post page
//route           GET /posts/create
//requireAuth     True
exports.getCreatePost = async (req, res, next) => {
  res.render("createPost");
};
//desc            Create a new post
//route           GET /posts/
//requireAuth     True
exports.createPost = async (req, res, next) => {
  console.log(req.body);
  //Create post
  const post = await Post.create(req.body);
  res.render("post", { post: post });
};

//desc            get a post
//route           GET /posts/:id
//requireAuth     False
exports.getPost = async (req, res, next) => {
  //Find post
  const post = await Post.findById(req.params.id);

  res.render("post", { post: post });
};

//desc            update a post
//route           GET /posts/:id
//requireAuth     True
exports.updatePost = async (req, res, next) => {
  //Find post and
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.redirect(`posts/${post.id}`);
};

//desc            delete a post
//route           GET /posts/:id
//requireAuth     True
exports.deletePost = async (req, res, next) => {
  //Find post and
  const post = await Post.findByIdAndDelete(req.params.id);

  res.redirect("/");
};

//desc            search for a post
//route           GET /posts/search?q=str
//requireAuth     True
// exports.searchPost = async (req, res, next) => {
//   //Find post and check
//   const post = await Post.(req.params.id);

//   res.redirect("/");
// };
