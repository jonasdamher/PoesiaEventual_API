'use strict';

const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        min: 2,
        validate: {
            validator: function (v) {
                return /[^0-9]/.test(v);
            },
            message: props => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
        unique: [true, 'El nombre introducido ya existe.']
    },
    url: {
        type: String,
        min: 2,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('author', authorSchema)