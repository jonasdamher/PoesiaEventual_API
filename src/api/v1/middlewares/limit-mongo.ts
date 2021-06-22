'use strict';

import { NextFunction, Request, Response } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';

const opts = {
    storeClient: mongoose.connection,
    points: 10, // Number of points
    duration: 1, // Per second(s)
};

const limiter_mongo = new RateLimiterMongo(opts);

const limiter = (req: Request, res: Response, next: NextFunction) => {
    limiter_mongo.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(_ => {
            res.status(429).send('Too Many Requests');
        });
};

export default limiter;