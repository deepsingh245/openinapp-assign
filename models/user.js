const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Please provide your name"],
  },
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  phone: {
    type: Number,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
});

const newUser = mongoose.model("user", UserSchema,"user");
module.exports = newUser;
