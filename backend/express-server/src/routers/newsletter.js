const express = require("express");
const { signUpToNewsletter } = require("../controllers/newsletterController");

const router = new express.Router();

router.post("/newsletter/signup", signUpToNewsletter);

module.exports = router;
