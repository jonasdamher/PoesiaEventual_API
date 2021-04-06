'use strict';

const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('author', authorSchema)