'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
<<<<<<< HEAD
        required: true
=======
        required: true,
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
<<<<<<< HEAD
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
=======
    }
>>>>>>> bf8fee4e4b6f0e3dc9f1ea761098a1213f85dbc8
});

module.exports = mongoose.model('Customer', schema);