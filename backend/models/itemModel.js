const mongoose = require("mongoose");
const Comment = require("./commentModel").schema;

const itemSchema = mongoose.Schema(
  {
    name: {
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
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
