const User = require("../models/userModel");
const { sendEmail } = require("../emails/account");

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    // sendEmail({
    //   to: user.email,
    //   subject: "BeFit - Welcome",
    //   text: `Welcome ${user.firstName} on our website.`,
    // });
    res.status(201).send({ token });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const duplicateError = {
        message: "Email address already in use",
        code: 11000,
      };
      return res.status(400).send({ error: duplicateError });
    }
    res.status(400).send({ error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ token, role: user.role });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((obj) => obj.token !== req.token);
    await user.save();
    res.status(200).send();
  } catch (error) {
    res.status(401).send({ error });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
