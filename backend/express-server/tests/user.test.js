const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");

const User = require("../src/models/userModel");
const validator = require("validator");

const userId = new mongoose.Types.ObjectId();
const adminId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userId,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  password: "John123456!!",
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.SECRET),
    },
  ],
};

const admin = {
  _id: adminId,
  firstName: "John",
  lastName: "Doe",
  email: "admin1@befit.com",
  password: "Admin123456!@",
  role: "admin",
  tokens: [
    {
      token: jwt.sign({ _id: adminId }, process.env.SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(admin).save();
});

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users/create")
    .send({
      firstName: "Jan",
      lastName: "Nowak",
      email: "jan.nowak@gmail.com",
      password: "Jan123456!",
    })
    .expect(201);

  const user = await User.findById(userOne._id);
  expect(user).not.toBeNull();

  expect(user.password).not.toBe("Jan123456!");

  const isTokenCorrect = validator.isJWT(response.body.token);
  expect(isTokenCorrect).toBe(true);
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const isTokenCorrect = validator.isJWT(response.body.token);
  expect(isTokenCorrect).toBe(true);
});

test("Should not login nonexisting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "Wrongpass123",
    })
    .expect(400);
});

test("Should not login user as admin", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const isTokenCorrect = validator.isJWT(response.body.token);
  expect(isTokenCorrect).toBe(true);

  expect(response.body.role).toBe(undefined);
});

test("Should login admin", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: admin.email,
      password: admin.password,
    })
    .expect(200);

  const isTokenCorrect = validator.isJWT(response.body.token);
  expect(isTokenCorrect).toBe(true);

  expect(response.body.role).toBe("admin");
});

test("Should logout user", async () => {
  await request(app)
    .post("/users/logout")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not logout unauthenticated user", async () => {
  await request(app).post("/users/logout").send().expect(401);
});
