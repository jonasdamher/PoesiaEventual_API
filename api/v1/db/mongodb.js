'use strict';

const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

// Connect to MONGODB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    try {
        app.listen(process.env.PORT)
        console.log(`STARTING SERVER ON http://localhost:${process.env.PORT}/api/${process.env.API_VERSION}/`)
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
    inmemoryBlockOnConsumed: 300, // If userId or IP consume >=300 points per minute
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiterMongoDb.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(_ => {
            res.status(429).send('Too Many Requests');
        });
};

app.use(rateLimiterMiddleware);

exports.default = mongoose