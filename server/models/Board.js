const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema( {
    name: {
        type: String,
        required : true
    },
    background: {
        type: String,
        default: '#33cc33'
    }
});

module.exports = mongoose.model('Board', BoardSchema);