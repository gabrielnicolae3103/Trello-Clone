const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const users = await User.find();
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        const accessToken = jwt.sign({
            username: user.username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)},
            process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken });
    } else {
        res.status(400).send('Username or password incorrect');
    }
});

module.exports = { router, authenticateToken };