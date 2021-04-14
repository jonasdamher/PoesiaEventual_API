'use strict';

const AUTHOR = require('../models/author-model')
const POEM = require('../models/poem-model')

module.exports = {
    getWithId,
    searchAuthor,
    random,
    getPoemsList,
    create,
    update
}

async function getWithId(req, res) {

    AUTHOR.findById(req.params.id).then(authorResponse => {

        return res.status(200).json(authorResponse)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function searchAuthor(req, res) {

    const search = req.params.search.trim().toLowerCase()
    const perPage = parseInt(req.query.perpage)
    let page = Math.max(0, parseInt(req.query.page))
    let pageNum = page
    --page

    AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(count => {

        const limit = Math.ceil(count / perPage)

        AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } }).skip(perPage * page).limit(perPage).sort('name')
            .then(authorResponse => {

                let data = {
                    authors: authorResponse
                }

                if (limit > pageNum) {
                    data.pagination = { perPage: perPage, page: ++pageNum, lastPage: limit }
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

    AUTHOR.find().countDocuments().then(count => {

        const random = Math.floor(Math.random() * count)

        AUTHOR.findOne().skip(random).then(author => {

            return res.status(200).json(author)
        }).catch(err => {

            console.log(err)
            return res.status(400).json(err)
        })

    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function getPoemsList(req, res) {

    POEM.find({ author: req.params.id }).populate('author').limit(6).then(authorResponse => {

        return res.status(200).json(authorResponse)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function create(req, res) {

    AUTHOR.create(req.body).then(poem => {

        return res.status(201).json(poem)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function update(req, res) {

    AUTHOR.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(authorResponse => {

        return res.status(200).json(authorResponse)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}
