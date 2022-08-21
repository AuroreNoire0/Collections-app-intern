const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Collection = require("../models/collectionModel");
const Comment = require("../models/commentModel");
const Item = require("../models/itemModel");

const createComment = asyncHandler(async (req, res) => {
  const { content, authorComment, itemId, collectionId, authorItemId } =
    req.body;

  if (!content || !authorComment || !collectionId || !authorItemId || !itemId) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const newComment = new Comment({
      content,
      authorComment,
      collectionId,
      itemId,
      authorItemId,
    });

    const createdComment = await newComment.save();
    const authorItem = await User.findOneAndUpdate(
      { _id: authorItemId },
      { $push: { "collections.$[e].items.$[i].comments": newComment } },
      { arrayFilters: [{ "e._id": collectionId }, { "i._id": itemId }] }
    );

    if (authorItem) {
      updatedUser = await authorItem.save();
    } else {
      res.status(404);
      throw new Error("Author not found");
    }

    const collection = await Collection.findOneAndUpdate(
      { _id: collectionId },
      { $push: { "items.$[e].comments": newComment } },
      { arrayFilters: [{ "e._id": itemId }] }
    );

    if (collection) {
      updatedCollection = await collection.save();
    } else {
      res.status(404);
      throw new Error("Collection  not found");
    }

    const item = await Item.findOneAndUpdate(
      { _id: itemId },
      { $push: { comments: newComment } }
    );

    if (item) {
      updatedItem = await item.save();
    } else {
      res.status(404);
      throw new Error("Item  not found");
    }

    res.status(201).json(createdComment);
  }
});

module.exports = {
  createComment,
};
