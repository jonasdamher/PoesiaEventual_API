'use strict';

const mongoose = require('mongoose')

const poemSchema = mongoose.Schema({
    id_author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('poem', poemSchema)