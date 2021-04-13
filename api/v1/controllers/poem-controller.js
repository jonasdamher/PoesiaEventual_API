'use strict';

const POEM = require('../models/poem-model')
module.exports = {
    getPoemWithId,
    getSearchPoem,
    getPoemRandom,
    createPoem,
    update,
    getAll
}

async function limitPageAuthor(search, perPage) {
    return await POEM.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(res => {
        let limit = Math.ceil(res / perPage)
        return limit
    })
}

async function getSearchPoem(req, res) {

    const search = req.params.search.trim().toLowerCase()
    const perPage = parseInt(req.query.perpage)
    let page = Math.max(0, parseInt(req.query.page))
    let pageNum = page
    --page
    let limit = await limitPageAuthor(search, perPage)

    POEM.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } })
        .skip(perPage * page).limit(perPage).sort('title')
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
}

async function getPoemRandom(req, res) {
    let count = await POEM.find().countDocuments().then(res => {
        return res
    })

    const random = Math.floor(Math.random() * count)

    POEM.findOne().populate('author', 'name').skip(random).then(poem => {
        return res.status(200).json(poem)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function getAll(req, res) {

    POEM.find().limit(10).then(poems => {

        let clearPoems = poems.map(poem => {
           
            const capitalize = (s) => {
                if (typeof s !== 'string') return ''
                return s.charAt(0).toUpperCase() + s.slice(1)
            }

            let clearText = poem.text.split('\n').map(text => {
                let clearSlashSpaces = text.replace(/[/\/\n/\t]/, '').trim()
                if (clearSlashSpaces.length > 0) {
                    return clearSlashSpaces
                }
            }).join('\n')

            poem.title = capitalize(poem.title).trim()
            poem.text = clearText.trim()

            return poem
        })

        return res.status(200).json(clearPoems)
    }).catch(err => {

        console.log(err)
        return res.status(400).json(err)
    })
}

async function getPoemWithId(req, res) {

    POEM.findById({ _id: req.params.id }).populate('author', 'name')
        .then(poem => {
            return res.status(200).json(poem)
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