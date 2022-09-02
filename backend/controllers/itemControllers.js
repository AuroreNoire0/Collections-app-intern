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
    img,
    additionalInputs,
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
      img,
      additionalInputs,
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
      await parentCollection.save();
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

const updateLike = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { action, fromUserId } = req.body;

  const item = await Item.findOne({ _id: id });

  if (item) {
    switch (action) {
      case "add":
        item.likedBy.push(fromUserId);
        break;
      case "remove":
        item.likedBy = item.likedBy.filter((i) => i !== fromUserId);
        break;
    }
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const updateItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, tags, img } = req.body;
  const item = await Item.findOne({ _id: id });

  const authorId = item.authorId;

  if (item) {
    item.name = name;
    item.tags = tags;
    item.img = img;
    const updatedItem = await item.save();

    const collection = await Collection.findOneAndUpdate(
      { _id: item.collectionId },
      {
        $set: { "items.$[i].tags": tags },
        "items.$[i].name": name,
        "items.$[i].img": img,
      },
      { arrayFilters: [{ "i._id": id }] }
    );

    if (collection) {
      await collection.save();
    } else {
      res.status(404);
      throw new Error("Collection not found");
    }

    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  if (items) {
    res.json(items);
  } else {
    res.status(404);
    throw new Error("Items not found");
  }
});

const search = asyncHandler(async (req, res) => {
  const query = req.params.query;
  const results = await Item.aggregate([
    {
      $search: {
        index: "Search",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ]);

  if (results) {
    res.json(results);
  } else {
    res.status(404);
    throw new Error("Results not found");
  }
});

module.exports = {
  createItem,
  deleteItem,
  getItemDetails,
  fetchTags,
  updateItem,
  updateLike,
  getItems,
  search,
  // getUserCollections,
  // deleteCollection,
  // getCollectionDetails,
  // updateCollection,
};
