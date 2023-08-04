const express = require("express");
const auth = require("../middlewares/auth");

const { createUser, loginUser, logoutUser } = require("../controllers/userController");

const router = new express.Router();

router.post("/users/create", createUser);
router.post("/users/login", loginUser);
router.post("/users/logout", auth, logoutUser);

module.exports = router;
