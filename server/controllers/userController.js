const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok", user });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.json({ status: "error", error: "Invalid Email" });
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token, name: user.name });
  } else {
    return res.json({ status: "error", error: "Invalid Password" });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    name: req.params.user,
  });
  if (user) return res.json({ ok: true, user });
  else return res.json({ ok: false });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  if (users.length > 0) return res.json({ ok: true, users });
  else return res.json({ ok: false });
};

exports.invite = async (req, res) => {
  const { query } = req.query;
  const searchQuery = {
    index: "searchUser",
    regex: {
      query: `(.*)${query}(.*)`,
      path: ["name","email"]
    }
  };
  try {
    const user = await User.aggregate([{ $search: searchQuery }]);
    res.json({ status: "ok", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
