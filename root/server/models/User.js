const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is Required"],
  },
  role: {
    type: String,
    required: [false, "Role is required"],
  },
  license: {
    type: String,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else  {
      throw Error("incorrect password or email");
    }
  }
};

module.exports = mongoose.model("users", userSchema);
