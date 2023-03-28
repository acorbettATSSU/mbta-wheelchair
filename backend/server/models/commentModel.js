const mongoose = require("mongoose");

//user schema/model
const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    commentID:{
      type: Number,
      required: true,
      lable: "commentID",
      unique: true
    },

    comment: {
      type: String,
      required: true,
      label: "comment",
    },
    stop: {
      type: String,
      required: true,
      lable: "stopID"
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "comment" }
);

module.exports = mongoose.model('comment', commentSchema)