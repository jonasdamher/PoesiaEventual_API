'use strict';

import { Request, Response, NextFunction } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';

/**
 * Configuración para limitar peticiones a la API por usuario
 */

const opts = {
    points: 700, // Número de puntos permitidos
    duration: 60, // Por segundo(s)
    storeClient: mongoose.connection, // Cliente de la base de datos de MongoDB
    dbName: 'poesiaeventual', // Nombre de la base de datos
    keyPrefix: 'ratelimit', // Prefijo para las claves en la base de datos
};

const limiter_mongo = new RateLimiterMongo(opts);

const limiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Consume un punto del límite para la IP actual
        await limiter_mongo.consume(req.ip);

        // Continúa con la siguiente función de middleware
        next();
    } catch (error: any) {
        // Si se excede el límite, responde con un código de estado 429 (Too Many Requests)
        res.status(429).send('Too Many Requests');
    }
};

export default limiter;