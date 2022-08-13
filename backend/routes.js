const express = require("express");
const {
  getUserCollections,
  createCollection,
  deleteCollection,
} = require("./controllers/collectionControllers");
const {
  authUser,
  registerUser,
  blockUser,
  deleteUser,
} = require("./controllers/userControllers");

const router = express.Router();

// router.route("/").post(registerUser);
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/user-page").get(getUserCollections);
router.route("/create-collection").post(createCollection);
router.route("/collection/:id").get(deleteCollection);

// router.route("/messages/:name").post(sendMessage);
// router.route("/messages/:id").get(getUsers);

module.exports = router;
