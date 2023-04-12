const mongoose = require("mongoose");

//user schema/model
const ratingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },

    rating: {
        type: Number,
        required: true,
        label: "rating",
        min: 0,
        max: 10,
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
  { collection: "rating" }
);

module.exports = mongoose.model('rating', ratingSchema)