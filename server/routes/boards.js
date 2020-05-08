const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

router.get('/', async (req, res) => {
    try {
        console.log('getting all boards');
        const boards = await Board.find();
        res.json(boards);
    } catch (error) {
        res.status(500).json({message: error});
    }
});

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

module.exports = router;