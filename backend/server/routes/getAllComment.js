const express = require("express");
const router = express.Router();
const newCommentModel = require('../models/commentModel')

router.get('/getAllComment', async (req, res) => {
    const Comment = await newCommentModel.find();
    return res.json(Comment)
  })

  module.exports = router;