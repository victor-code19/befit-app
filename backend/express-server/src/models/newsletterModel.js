const { Schema, model } = require("mongoose");
const validator = require("validator");

const newsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
});

const Newsletter = model("Newsletter", newsletterSchema);

module.exports = Newsletter;
