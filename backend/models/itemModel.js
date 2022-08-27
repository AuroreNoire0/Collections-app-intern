const mongoose = require("mongoose");
const Comment = require("./commentModel").schema;

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      index: true,
    },
    author: {
      type: String,
      required: false,
      index: true,
    },
    authorId: {
      type: String,
      required: false,
    },
    collectionName: {
      type: String,
      required: false,
      index: true,
    },
    collectionId: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    tags: [
      {
        type: String,
        required: false,
        index: true,
      },
    ],
    comments: [Comment],
    likedBy: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
Item.createIndexes();
module.exports = Item;
