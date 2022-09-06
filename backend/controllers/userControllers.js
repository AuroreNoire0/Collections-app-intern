const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const Collection = require("../models/collectionModel");
const Item = require("../models/itemModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      admin: user.admin,
      collections: user.collections,
      root: user.root,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Error occured");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      admin: user.admin,
      collections: user.collections,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const userCollections = await Collection.find({ authorId: req.params.id });
  const userItems = await Item.find({ authorId: req.params.id });

  if (user && !user.root) {
    await user.remove();

    userCollections &&
      userCollections.forEach(async (col) => await col.remove());

    userItems && userItems.forEach(async (item) => await item.remove());

    res.json({ id: req.params.id, message: "User deleted" });
  } else if (user && user.root) {
    res.json({ id: req.params.id, message: "You can't delete root user." });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });

  if (user) {
    await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Error occured. Please try to log in again.");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { action } = req.body;
  if (user) {
    switch (action) {
      case "block":
        user.status = "Blocked";
        break;
      case "unblock":
        user.status = "Active";
        break;
      case "addAdmin":
        user.admin = true;
        break;
      case "removeAdmin":
        user.admin = false;
        break;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  deleteUser,
  updateUser,
  getUsers,
  getUserDetails,
};
