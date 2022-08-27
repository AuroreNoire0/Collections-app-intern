const express = require("express");
const {
  getUserCollections,
  createCollection,
  deleteCollection,
  getCollectionDetails,
  updateCollection,
  getCollections,
} = require("./controllers/collectionControllers");
const { createComment } = require("./controllers/commentControllers");
const {
  createItem,
  deleteItem,
  fetchTags,
  getItemDetails,
  updateItem,
  updateLike,
  getItems,
  search,
} = require("./controllers/itemControllers");
const {
  authUser,
  registerUser,
  deleteUser,
  getUsers,
  updateUser,
  getUserDetails,
} = require("./controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/user-details/:id").get(getUserDetails);
router.route("/delete-user/:id").delete(deleteUser);
router.route("/update-user/:id").post(updateUser);
router.route("/account/:id").get(getUserCollections);
router.route("/users").get(getUsers);

router.route("/create-collection").post(createCollection);
router.route("/collections").get(getCollections);
router.route("/update-collection/:id").post(updateCollection);
router.route("/details/:id").get(getCollectionDetails);
router.route("/collection/:id").delete(deleteCollection);

router.route("/create-item").post(createItem);
router.route("/items").get(getItems);
router.route("/item-details/:id").get(getItemDetails);
router.route("/delete-item/:id").delete(deleteItem);
router.route("/update-item/:id").post(updateItem);

router.route("/get-tags").get(fetchTags);
router.route("/create-comment").post(createComment);
router.route("/update-like/:id").post(updateLike);
router.route("/search/:query").get(search);

module.exports = router;
