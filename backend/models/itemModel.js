const mongoose = require("mongoose");
const Comment = require("./commentModel").schema;

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    authorId: {
      type: String,
      required: false,
    },
    collectionName: {
      type: String,
      required: false,
    },
    collectionId: {
      type: String,
      required: false,
    },
    tags: [
      {
        type: String,
        required: false,
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

module.exports = Item;
