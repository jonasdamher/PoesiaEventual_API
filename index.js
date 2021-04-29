'use strict';

const dotenv = require('dotenv')
dotenv.config()

const moment = require('moment')
moment.locale('es')

const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')

const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const express = require('express')
const app = express()

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())

const api = require('./api/' + process.env.API_VERSION + '/routes')
app.use('/api/' + process.env.API_VERSION, api)

// Connect to MONGODB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    try {
        app.listen(process.env.PORT)
     } catch (error) {
        console.log(error)
    }
}).catch(err => {
    console.log(err)
})

const rateLimiterMongoDb = new RateLimiterMongo({
    storeClient: mongoose.connection,
    points: 300, // Number of points
    duration: 60, // Per 60 seconds,
    inmemoryBlockOnConsumed: 300 // If userId or IP consume >=300 points per minute
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiterMongoDb.consume(req.ip)
        .then(() => {
            next()
        })
        .catch(_ => {
            res.status(429).send('Too Many Requests');
        })
}

app.use(rateLimiterMiddleware)