const mongoose = require("mongoose");
const Item = require("./itemModel").schema;

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    topic: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    additionalInputs: [],
    items: [Item],
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
