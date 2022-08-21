const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Collection = require("../models/collectionModel");
const Item = require("../models/itemModel");

const createItem = asyncHandler(async (req, res) => {
  const {
    name,
    tags,
    author,
    authorId,
    collectionName,
    collectionId,
    comments,
  } = req.body;

  if (!name || !collectionName || !collectionId || !authorId || !author) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const newItem = new Item({
      name,
      tags,
      author,
      authorId,
      collectionName,
      collectionId,
      comments,
    });

    const createdItem = await newItem.save();
    const parentCollection = await Collection.findOneAndUpdate(
      { _id: collectionId },
      { $push: { items: newItem } }
    );

    if (parentCollection) {
      updatedCollection = await parentCollection.save();
    } else {
      res.status(404);
      throw new Error("Collection not found");
    }

    const authorUser = await User.findOneAndUpdate(
      { _id: authorId },
      { $push: { "collections.$[e].items": newItem } },
      { arrayFilters: [{ "e._id": collectionId }] }
    );

    if (authorUser) {
      updatedAuthor = await authorUser.save();
    } else {
      res.status(404);
      throw new Error("Collection not found");
    }

    res.status(201).json(createdItem);
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Item.findOne({ _id: id });

  if (item) {
    await item.remove();

    const parentCollection = await Collection.findOneAndUpdate(
      { _id: item.collectionId },
      { $pull: { items: { _id: id } } }
    );

    if (parentCollection) {
      updatedCollection = await parentCollection.save();
    } else {
      res.status(404);
      throw new Error("Collection not found");
    }

    const author = await User.findOneAndUpdate(
      { _id: item.authorId },
      { $pull: { "collections.$[e].items": { _id: id } } },
      { arrayFilters: [{ "e._id": item.collectionId }] }
    );

    if (author) {
      updatedAuthor = await author.save();
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({ message: "Item deleted" });
  } else {
    res.status(404);
    throw new Error("Collection not found");
  }
});

const getItemDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Item.findOne({ _id: id });

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const fetchTags = asyncHandler(async (req, res) => {
  const items = await Item.find();
  const tags = items.map((i) => i.tags).flat();

  if (tags) {
    res.status(201).json(tags);
  } else {
    res.status(404);
    throw new Error("Tags not found");
  }
});

const addLike = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { fromUserId } = req.body;

  // const item = await Item.findOneAndUpdate(
  //   { _id: id },
  //   { $push: { likedBy: fromUserId } }
  // );
  const item = await Item.findOne({ _id: id });
  console.log(`Before: ${item}`);

  if (item) {
    item.likedBy.push(fromUserId);
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const removeLike = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { fromUserId } = req.body;
  // const item = await Item.findOneAndUpdate(
  //   { _id: id },
  //   { $pull: { likedBy: fromUserId } },
  //   { returnNewDocument: true }
  // );
  const item = await Item.findOne({ _id: id });

  if (item) {
    item.likedBy = item.likedBy.filter((i) => i !== fromUserId);

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

module.exports = {
  createItem,
  deleteItem,
  getItemDetails,
  fetchTags,
  addLike,
  removeLike,
  // getUserCollections,
  // deleteCollection,
  // getCollectionDetails,
  // updateCollection,
};
