'use strict';

const dotenv = require('dotenv')
dotenv.config()

const moment = require('moment')
moment.locale('es')
// const fs = require('fs')

const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const AUTHOR = require('./api/v1/models/author-model')
const POEM = require('./api/v1/models/poem-model')

app.use(cors())
app.use(express.json())

const api = require('./api/' + process.env.API_VERSION + '/routes.js')
app.use('/api/' + process.env.API_VERSION, api)

// Connect to MONGODB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    try {
        app.listen(process.env.PORT)
        console.log(`STARTING SERVER ON http://localhost:${process.env.PORT}/api`)
    } catch (error) {
        console.log(error)
    }
}).catch(err => {
    console.log(err)
})

// fs.readFile('list.json', { encoding: '' }, (err, data) => {
//     if (err) throw err;
//     const json = JSON.parse(data)
//     let jsonC = json.list

//     let authors = jsonC.map(data => data.name)

    // authors.forEach(name => {
    //     AUTHOR.create({ name: name }).then(res => {
    //         console.log('se ha introducido al author: ' + name)
    //     }).catch(err => {
    //         console.log('ERROR: ' + err)
    //     })
    // });

    // AUTHOR.find().then(res => {

    //     res.forEach((author, i) => {

    //         let authorJson = jsonC[i].poems.map(col => {
    //             if (col.title.length > 0 && col.text.length > 0) {
    //                 return {
    //                     id_author: author._id,
    //                     title: col.title,
    //                     text: col.text
    //                 }
    //             }
    //         })

    //         if (jsonC[i].name == author.name) {
    //             if (authorJson.length > 0) {
    //                 POEM.insertMany(authorJson).then(a => {
    //                     console.log('se han introducido los poemas de ' + author.name)
    //                 })
    //             }
    //         }
    //     })
    // }).catch(err => {
    //     console.log(err)
    // })

// });
