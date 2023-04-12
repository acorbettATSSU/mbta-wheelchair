const express = require("express");
const router = express.Router();
const newRatingModel = require('../models/ratingModel')

router.get('/getAllRating', async (req, res) => {
    const Rating = await newRatingModel.find();
    return res.json(Rating)
  })

  module.exports = router;