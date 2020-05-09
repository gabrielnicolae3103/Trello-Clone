const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error});
    }
});

// Find an user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// Post a new user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        const posted = await user.save();
        res.json(posted);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

// Delete an user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.deleteOne({_id : req.params.id});
        res.json('user deleted succesfully');
    } catch (error) {
        res.status(404).json({message: error});
    }
});

module.exports = router;