const mongoose = require("mongoose");

//user schema/model
const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },

    comment: {
      type: String,
      required: true,
      label: "comment",
    },
    stopName: {
      type: String,
      required: true,
      lable: "stopName"
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "comment" }
);

module.exports = mongoose.model('comment', commentSchema)