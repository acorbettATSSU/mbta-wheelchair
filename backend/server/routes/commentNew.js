const express = require("express");
const router = express.Router();

const commentModel = require('../models/commentModel')

router.post('/add', async (req, res) => {
    
    const { username, comment, stopName } = req.body

    //creates a new user
    const createComment = new commentModel({
        username: username,
        comment: comment,
        stopName: stopName,
    });

   
    try {
        const saveComment = await createComment.save();
        res.send(saveComment);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new comment" });
    }

})

module.exports = router;