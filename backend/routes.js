const express = require("express");
const {
  getUserCollections,
  createCollection,
  deleteCollection,
  getCollectionDetails,
  updateCollection,
} = require("./controllers/collectionControllers");
const {
  authUser,
  registerUser,
  blockUser,
  deleteUser,
  getUpdatedUserState,
} = require("./controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/update/:id").get(getUpdatedUserState);
router.route("/account/:id").get(getUserCollections);
router.route("/create-collection").post(createCollection);
router.route("/update-collection/:id").post(updateCollection);
router.route("/details/:id").get(getCollectionDetails);
router.route("/collection/:id").delete(deleteCollection);

// router.route("/messages/:name").post(sendMessage);
// router.route("/messages/:id").get(getUsers);

module.exports = router;
