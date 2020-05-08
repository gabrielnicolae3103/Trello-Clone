const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//ROUTES
const boardRoutes = require('./routes/boards');


require('dotenv/config')
//app.use(cors);
app.use('/', bodyParser.json());
app.use('/boards', boardRoutes);

app.get('/', (req, res) => {
    res.send('we are on home');
})

app.listen(3000);

//DATABASE

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db');
});

//MIDDLEWARES


