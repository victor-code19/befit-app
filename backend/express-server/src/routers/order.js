const express = require("express");
const auth = require("../middlewares/auth");
const createOrder = require("../controllers/orderController");

const router = new express.Router();

router.post("/orders/createOrder", auth, createOrder);

module.exports = router;
