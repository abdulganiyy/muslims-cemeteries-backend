const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  //   body = await req.body;

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: user.id }, "olatunde001", { expiresIn: 60000 });

  res.json({
    token,
    data: user,
  });
};

exports.login = async (req, res) => {
  //   body = await req.body;
  const user = await User.findOne({
    email: req.body.email,
  }).select("+password");

  if (!user || !(await user.confirmPassword(req.body.password))) {
    return res.json({
      message: "Login Failed:Enter correct password and email",
    });
  }

  const token = jwt.sign({ id: user.id }, "olatunde001", { expiresIn: 60000 });

  res.json({
    token,
    data: user,
  });
};
