const express = require('express');
const router = express.Router();
const List = require('../models/List');

// Get all lists
router.get('/', async (req, res) => {
    try {
        const lists = await List.find();
        res.json(lists);
    } catch (error) {
        res.status(500).json({message: error});
    }
});

// Find a list by id
router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.json(list);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Post a new list
router.post('/', async (req, res) => {
    const list = new List({
        name: req.body.name,
        boardId: req.body.boardId
    });
    try {
        const posted = await list.save();
        res.json(posted);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

// Delete a list
router.delete('/:id', async (req, res) => {
    try {
        const list = await List.deleteOne({_id : req.params.id});
        res.json('list deleted succesfully');
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Update a list
router.patch('/:id', async (req, res) => {
    try {
        const listBeforeUpdate = await List.findById(req.params.id);

        const list = await List.findByIdAndUpdate(
            {_id: req.params.id},
            { $set: {
                name: req.body.name}},
            { new: true });
        res.json(list);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

module.exports = router;