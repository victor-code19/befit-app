const express = require("express");
const adminAuth = require("../middlewares/adminAuth");

const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  removePost,
} = require("../controllers/postController");

const router = new express.Router();

router.get("/blog/posts", getPosts);
router.get("/blog/post/:id", getPost);
router.post("/blog/post", adminAuth, addPost);
router.patch("/blog/post/:id", adminAuth, updatePost);
router.delete("/blog/post/:id", adminAuth, removePost);

module.exports = router;
