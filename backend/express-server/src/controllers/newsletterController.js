const Newsletter = require("../models/newsletterModel");

const signUpToNewsletter = async (req, res) => {
  const newsletter = new Newsletter(req.body);
  try {
    await newsletter.save();
    res.status(201).send({ status: 201 });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const duplicateError = {
        message: "Email address already signed up to newsletter",
        code: 11000,
      };
      return res.status(400).send({ error: duplicateError });
    }
    res.status(400).send({ error });
  }
};

module.exports = { signUpToNewsletter };
