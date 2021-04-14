'use strict';

const POEM = require('../models/poem-model')

module.exports = {
    getWithId,
    searchPoem,
    random,
    create,
    update
}

async function getWithId(req, res) {

    POEM.findById({ _id: req.params.id }).populate('author', 'name').then(poem => {
      
        return res.status(200).json(poem)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function searchPoem(req, res) {

    const search = req.params.search.trim().toLowerCase()
    const perPage = parseInt(req.query.perpage)
    let page = Math.max(0, parseInt(req.query.page))
    let pageNum = page
    --page

    POEM.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(count => {
        
        const limit = Math.ceil(count / perPage)

        POEM.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).skip(perPage * page).limit(perPage).sort('title')
            .then(authorResponse => {

                let data = {
                    poems: authorResponse
                }

                if (limit > pageNum) {
                    data.pagination = { perPage: perPage, page: ++pageNum }
                }
                return res.status(200).json(data)
            }).catch(err => {

                console.log(err)
                return res.status(400).json(err)
            })

    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function random(req, res) {

    POEM.find().countDocuments().then(count => {

        const random = Math.floor(Math.random() * count)

        POEM.findOne().populate('author', 'name').skip(random).then(poem => {

            return res.status(200).json(poem)
        }).catch(err => {

            console.log(err)
            return res.status(400).json(err)
        })

    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function create(req, res) {

    POEM.create(req.body).then(poem => {

        return res.status(201).json(poem)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function update(req, res) {

    POEM.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(authorResponse => {

        return res.status(200).json(authorResponse)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}
