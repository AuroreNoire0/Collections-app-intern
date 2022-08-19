const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    authorComment: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    collectionId: {
      type: String,
      required: true,
    },
    authorItemId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
