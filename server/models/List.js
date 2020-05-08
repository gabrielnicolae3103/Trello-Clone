const mongoose = require('mongoose');

const ListSchema = mongoose.Schema( {
    name: {
        type : String,
        required : true
    },
    boardId: {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('Lists', ListSchema);