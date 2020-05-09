const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Get all cards
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json({message: error});
    }
});

// Find a card by id
router.get('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.json(card);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Post a new card
router.post('/', async (req, res) => {
    const card = new Card({
        title: req.body.title,
        listId: req.body.listId,
        description: req.body.description
    });
    try {
        const posted = await card.save();
        res.json(posted);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

// Delete a card
router.delete('/:id', async (req, res) => {
    try {
        const card = await Card.deleteOne({_id : req.params.id});
        res.json('card deleted succesfully');
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Update a card
router.patch('/:id', async (req, res) => {
    try {
        const cardBeforeUpdate = await Card.findById(req.params.id);
        const $set = {};
        if(req.body.title)
            $set.title = req.body.title;
        if(req.body.description)
            $set.description = req.body.description;
        const card = await Card.findByIdAndUpdate(
            {_id: req.params.id},
            { $set },
            { new: true });
        res.json(card);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

module.exports = router;