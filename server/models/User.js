const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema( {
    username: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);