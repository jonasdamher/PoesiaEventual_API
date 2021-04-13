'use strict';

const mongoose = require('mongoose')

const poemSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author'
    },
    title: {
        type: String,
        required: [true, 'Es obligatorio introducir un título del poema.'],
    },
    text: {
        type: String,
        required: [true, 'Es obligatorio introducir un cuerpo del poema.'],
    }
})

module.exports = mongoose.model('poem', poemSchema)