const express = require("express");
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
// router.route("/messages/:name").get(getMessages);
// router.route("/messages/:name").post(sendMessage);
// router.route("/messages/:id").get(getUsers);

module.exports = router;
