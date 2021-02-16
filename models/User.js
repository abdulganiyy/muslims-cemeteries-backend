const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.confirmPassword = async function (candidatePassword) {
  return await bcrypt.compare(this.password, candidatePassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
