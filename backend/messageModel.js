const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    messageBody: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
