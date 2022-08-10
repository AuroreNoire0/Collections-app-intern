const express = require("express");
const {
  getUsers,
  registerUser,
  sendMessage,
  getMessages,
} = require("./controllers/controllers");

const router = express.Router();

// router.route("/").post(registerUser);
router.route("/").post(registerUser);
router.route("/").get(getUsers); // to list of recipient
router.route("/messages/:name").get(getMessages);
router.route("/messages/:name").post(sendMessage);
// router.route("/messages/:id").get(getUsers);

module.exports = router;
