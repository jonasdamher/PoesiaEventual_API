'use strict';

const POEM = require('../models/poem-model')
module.exports = { 
    getPoemWithId, 
    createPoem, 
    update 
}

async function getPoemWithId(req, res) {

    POEM.findOne({_id:req.params.id})
        .then(authorResponse => {
             return res.status(200).json(authorResponse)
        }).catch(err => {

            console.log(err)
            return res.status(400).json(err)
        })
}

async function createPoem(req, res) {

    POEM.create(req.body).then(poem => {

        return res.status(201).json(poem)

    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function update(req, res) {

    POEM.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(authorResponse => {

            return res.status(200).json(authorResponse)

        }).catch(err => {

            console.log(err)
            return res.status(400).json(err)
        })
}