'use strict';

import { Request, Response, NextFunction } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';

/**
 * Configuración para limitar peticiones a la API por usuario
 */

const opts = {
    dbName: 'limit_mongo',
    storeClient: mongoose.connection,
    points: 10, // Number of points
    duration: 3 // Per second(s)
};

const limiter_mongo = new RateLimiterMongo(opts);

const limiter = (req: Request, res: Response, next: NextFunction) => {
    limiter_mongo.consume(req.ip)
        .then(() => next())
        .catch(() => res.status(429).send('Too Many Requests'));
};

export default limiter;