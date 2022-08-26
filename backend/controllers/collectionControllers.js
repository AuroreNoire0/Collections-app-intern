const asyncHandler = require("express-async-handler");
// const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const Collection = require("../models/collectionModel");

const getUserCollections = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userCollections = await Collection.find({ authorId: id });
  res.json(userCollections);
});

// const createCollection = asyncHandler(async (req, res) => {
//   try {
//     const { name, description, topic, author, authorId, items } = req.body;

//     if (!name || !description || !topic || !authorId || !author) {
//       res.status(400);
//       throw new Error("Please fill all the fields");
//     } else {
//       const newCollection = new Collection({
//         authorId,
//         name,
//         description,
//         topic,
//         author,
//         items,
//       });

//       const createdCollection = await newCollection.save();

//       try {
//         const authorColl = await User.findOneAndUpdate(
//           { _id: authorId },
//           { $push: { collections: newCollection } }
//         );

//         console.log(authorColl);

//         if (authorColl) {
//           console.log(authorColl.collections);
//           updatedUser = await authorColl.save();
//           res.json(updatedUser);
//         } else {
//           res.status(404);
//           throw new Error("User not found");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//       res.status(201).json(createdCollection);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

const createCollection = asyncHandler(async (req, res) => {
  const { name, description, topic, author, authorId, items, img } = req.body;

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
  const { name, description, topic } = req.body;
  const collection = await Collection.findOne({ _id: id });
  const authorColId = collection.authorId;

  if (collection) {
    collection.name = name;
    collection.description = description;
    collection.topic = topic;
    const updatedCollection = await collection.save();

    const authorColl = await User.findOneAndUpdate(
      { _id: authorColId },
      { $pull: { collections: { _id: id } } }
    );

    const authorColl2 = await User.findOneAndUpdate(
      { _id: authorColId },
      { $push: { collections: updatedCollection } }
    );

    if (authorColl2) {
      updatedUser = await authorColl2.save();
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    console.log(updatedCollection);
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
