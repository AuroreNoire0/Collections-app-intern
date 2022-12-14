const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Collection = require("../models/collectionModel");

const getUserCollections = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userCollections = await Collection.find({ authorId: id });
  res.json(userCollections);
});

const createCollection = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    topic,
    author,
    authorId,
    items,
    img,
    additionalInputs,
  } = req.body;

  if (!name || !description || !topic || !authorId || !author) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const newCollection = new Collection({
      authorId,
      name,
      description,
      topic,
      author,
      items,
      img,
      additionalInputs,
    });

    const createdCollection = await newCollection.save();
    const authorColl = await User.findOneAndUpdate(
      { _id: authorId },
      { $push: { collections: newCollection } }
    );

    if (authorColl) {
      updatedUser = await authorColl.save();
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(201).json(createdCollection);
  }
});

const deleteCollection = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const collection = await Collection.findOne({ _id: id });
  const authorColId = collection.authorId;

  if (collection) {
    await collection.remove();

    const authorColl = await User.findOneAndUpdate(
      { _id: authorColId },
      { $pull: { collections: { _id: id } } }
    );

    if (authorColl) {
      updatedUser = await authorColl.save();
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({ message: "Collection deleted" });
  } else {
    res.status(404);
    throw new Error("Collection not found");
  }
});

const getCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find();
  collections.sort((a, b) => b.items.length - a.items.length);
  if (collections) {
    res.json(collections);
  } else {
    res.status(404);
    throw new Error("Collections not found");
  }
});

const getCollectionDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const collection = await Collection.findOne({ _id: id });

  if (collection) {
    res.json(collection);
  } else {
    res.status(404);
    throw new Error("Collection not found");
  }
});

const updateCollection = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, description, topic, img, additionalInputs, authorId } =
    req.body;
  const collection = await Collection.findOne({ _id: id });

  if (collection) {
    collection.name = name;
    collection.description = description;
    collection.topic = topic;
    collection.img = img;
    collection.additionalInputs = additionalInputs;
    const updatedCollection = await collection.save();

    const authorColl = await User.findOneAndUpdate(
      { _id: authorId },
      {
        $set: { "collections.$[col].name": name },
        "collections.$[col].topic": topic,
        "collections.$[col].description": description,
        "collections.$[col].img": img,
        "collections.$[col].additionalInputs": additionalInputs,
      },
      { arrayFilters: [{ "col._id": id }] }
    );

    if (authorColl) {
      updatedUser = await authorColl.save();
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    res.json(updatedCollection);
  } else {
    res.status(404);
    throw new Error("Collection not found");
  }
});

module.exports = {
  getUserCollections,
  createCollection,
  deleteCollection,
  getCollectionDetails,
  getCollections,
  updateCollection,
};
