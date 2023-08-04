const Post = require("../models/postModel");

const getPosts = async (req, res) => {
  const category = req.query.category;
  try {
    const query = category ? { category } : {};
    const posts = await Post.find(query).select("-createdAt -content");
    res.send(posts);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    res.send(post);
  } catch (error) {
    res.send({ error });
  }
};

const addPost = async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).send({ id: post._id });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const removePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).send({ error: "Post not found" });
    }

    res.send();
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const updates = req.body;
  try {
    const post = await Post.findByIdAndUpdate(postId, updates);

    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    res.send();
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  getPosts,
  getPost,
  addPost,
  removePost,
  updatePost,
};
