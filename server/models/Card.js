const mongoose = require('mongoose');

const CardSchema = mongoose.Schema( {
    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
    },
    listId: {
        type : Number,
        required : true
    },
});

module.exports = mongoose.model('Boards', BoardSchema);