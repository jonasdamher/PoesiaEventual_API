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
    const perPage = parseInt(req.query.perpage ?? 4)
    let page = Math.max(0, parseInt(req.query.page ?? 1))
    let pageNum = page
    --page

    AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(count => {

        const limit = Math.ceil(count / perPage)

        AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } }).skip(perPage * page).limit(perPage).sort('name')
            .then(authorResponse => {

                let data = {
                    authors: authorResponse,
                    pagination: { perPage: perPage, page: pageNum, lastPage: limit, total: count }
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
    const perPage = parseInt(req.query.perpage ?? 4)
    let page = Math.max(0, parseInt(req.query.page ?? 1))
    let pageNum = page
    --page
    POEM.find({ author: req.params.id }).countDocuments().then(count => {
        const limit = Math.ceil(count / perPage)

        POEM.find({ author: req.params.id }).populate('author').skip(perPage * page).limit(perPage).sort('title').then(poemList => {

            let data = {
                poems: poemList,
                pagination: { perPage: perPage, page: pageNum, lastPage: limit, total: count }
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
