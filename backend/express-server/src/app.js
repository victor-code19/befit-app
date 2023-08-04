require("./db/mongoose");

const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/user");
const newsletterRouter = require("./routers/newsletter");
const postRouter = require("./routers/post");
const orderRouter = require("./routers/order");

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(newsletterRouter);
app.use(postRouter);
app.use(orderRouter);

module.exports = app;
