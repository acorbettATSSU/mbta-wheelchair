const express = require("express");
const router = express.Router();
const z = require('zod')
const bcrypt = require("bcrypt");
//const { newUserValidation } = require('../models/userValidator')
const commentModle = require('../models/commentModel')

router.post('/addComment', async (req, res) => {
    const createComment = new commentModle({
        username: username,
        commentID: commentID,
        comment: comment,
        stopID: stopID
    });

    try {
        const saveNewComment = await createComment.save();
        res.send(saveNewComment);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new comment" });
    }

})

module.exports = router;