const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");

const User = require("../src/models/userModel");
const Post = require("../src/models/postModel");

const adminId = new mongoose.Types.ObjectId();
const postId = new mongoose.Types.ObjectId();

const admin = {
  _id: adminId,
  firstName: "John",
  lastName: "Doe",
  email: "admin2@befit.com",
  password: "Admin123456!@",
  role: "admin",
  tokens: [
    {
      token: jwt.sign({ _id: adminId }, "SECRET_KEY"),
    },
  ],
};

const postOne = {
  _id: postId,
  title: "Post Title",
  introduction: "Post Introduction",
  content: "Post Content",
  category: "training",
};

beforeEach(async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await new Post(postOne).save();
  await new User(admin).save();
});

test("Should get posts", async () => {
  const response = await request(app).get("/blog/posts").expect(200);
  expect(response.body).not.toBeNull();
  expect(Array.isArray(response.body)).toBe(true);
});

test("Should get post", async () => {
  const response = await request(app).get(`/blog/post/${postId}`).expect(200);

  expect(response.body).not.toBeNull();

  expect(response.body).toMatchObject({
    title: "Post Title",
    introduction: "Post Introduction",
    content: "Post Content",
    category: "training",
  });
});

test("Should not get post with nonexisting id", async () => {
  await request(app).get("/blog/post/5485faa3ace98bc1205995e9").expect(404);
});

test("Should add post", async () => {
  const response = await request(app)
    .post("/blog/post")
    .set("Authorization", `Bearer ${admin.tokens[0].token}`)
    .send({
      title: "Example Title",
      introduction: "Example Introduction",
      content: "Example Content",
      category: "diet",
    })
    .expect(201);

  expect(typeof response.body.id).toBe("string");
});

test("Should update existing post", async () => {
  await request(app)
    .patch(`/blog/post/${postId}`)
    .set("Authorization", `Bearer ${admin.tokens[0].token}`)
    .send({
      title: "Updated Title",
      introduction: "Updated Introduction",
    })
    .expect(200);

  const post = await Post.findById(postId);

  expect(post).toMatchObject({
    title: "Updated Title",
    introduction: "Updated Introduction",
  });
});

test("Should not update nonexisting post", async () => {
  await request(app)
    .patch("/blog/post/5485faa3ace98bc1205995e9")
    .set("Authorization", `Bearer ${admin.tokens[0].token}`)
    .send({
      title: "Updated Title",
      introduction: "Updated Introduction",
    })
    .expect(404);
});

test("Should delete existing post", async () => {
  await request(app)
    .delete(`/blog/post/${postId}`)
    .set("Authorization", `Bearer ${admin.tokens[0].token}`)
    .expect(200);
});
