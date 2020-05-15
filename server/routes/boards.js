const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

// Find a board by username
router.get('/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        const board = await Board.find({members : user._id});
        res.json(board);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Post a new board
router.post('/', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const currentUser = jwt.decode(token).username;
        const currentUserId = (await User.findOne({username : currentUser}))._id;

        const board = new Board({
            name: req.body.name,
            background: req.body.background,
            members: currentUserId
        });
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
router.patch('/:id', async (req, res) => {
    try {
        const $set = {};
        if(req.body.name)
            $set.name = req.body.name;
        if(req.body.background)
            $set.background = req.body.background;
        if(req.body.members)
            $set.members = req.body.members;
        const board = await Board.findByIdAndUpdate(
            {_id: req.params.id},
            { $set },
            { new: true });
        res.json(board);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

module.exports = router;