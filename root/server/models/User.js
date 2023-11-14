const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String
  },

  refreshtoken: {
    type: String
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;
