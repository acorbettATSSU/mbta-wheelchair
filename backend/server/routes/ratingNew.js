const express = require("express");
const router = express.Router();

const ratingModel = require('../models/ratingModel')

router.post('/addRating', async (req, res) => {
    
    const { username, rating, stopName } = req.body

    //creates a new user
    const createRating = new ratingModel({
        username: username,
        stopName: stopName,
        rating: rating,
    });

   
    try {
        const saveRating = await createRating.save();
        res.send(saveRating);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new rating" });
    }

})

module.exports = router;