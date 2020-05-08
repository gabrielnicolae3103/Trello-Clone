const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

// Get all boards
router.get('/', async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (error) {
        res.status(500).json({message: error});
    }
});

// Find a board by id
router.get('/:id', async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        res.json(board);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Post a new board
router.post('/', async (req, res) => {
    const board = new Board({
        name: req.body.name,
        background: req.body.background
    });
    try {
        const posted = await board.save();
        res.json(posted);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

// Delete a board
router.delete('/:id', async (req, res) => {
    try {
        const board = await Board.deleteOne({_id : req.params.id});
        res.json('board deleted succesfully');
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Update a board
router.put('/:id', async (req, res) => {
    try {
        const board = await Board.findByIdAndUpdate(
            {_id: req.params.id},
            { $set: {
                name: req.body.name,
                background: req.body.background}});
        res.json(board);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

module.exports = router;