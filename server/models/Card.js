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
        type : String,
        required : true
    },
});

module.exports = mongoose.model('Cards', CardSchema);