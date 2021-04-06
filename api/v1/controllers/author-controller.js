'use strict';

const AUTHOR = require('../models/author-model')
const POEM = require('../models/poem-model')

module.exports = {
    getAuthorWithId,
    getSearchAuthor,
    getPoemsList,
    createAuthor,
    update
}

async function getAuthorWithId(req, res) {

    AUTHOR.findById(req.params.id).then(authorResponse => {
        return res.status(200).json(authorResponse)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function limitPageAuthor(search, perPage) {
    return await AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(res => {
        let limit = Math.ceil(res / perPage)
        return limit
    })
}

async function getSearchAuthor(req, res) {

    const search = req.params.search.trim().toLowerCase()
    const perPage = parseInt(req.query.perpage)
    let page = Math.max(0, parseInt(req.query.page))
    let pageNum = page
    --page
    let limit = await limitPageAuthor(search, perPage)
 
    AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } })
        .skip(perPage * page).limit(perPage).sort('name')
        .then(authorResponse => {

            let data = {
                authors: authorResponse
            }

            if (limit>pageNum) {
                data.pagination = { perPage: perPage, page: ++pageNum }
            }
            return res.status(200).json(data)
        }).catch(err => {

            console.log(err)
            return res.status(400).json(err)
        })
}

async function getPoemsList(req, res) {

    POEM.find({ id_author: req.params.id }).populate('author').limit(6).then(authorResponse => {
        console.log(authorResponse)
        return res.status(200).json(authorResponse)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function createAuthor(req, res) {

    AUTHOR.create(req.body).then(poem => {

        return res.status(201).json(poem)

    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function update(req, res) {

    AUTHOR.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(authorResponse => {

            return res.status(200).json(authorResponse)

        }).catch(err => {

            console.log(err)
            return res.status(400).json(err)
        })
}