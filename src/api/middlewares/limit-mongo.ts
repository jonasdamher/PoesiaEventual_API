'use strict';

import { NextFunction, Request, Response } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';

/**
 * Configuración para limitar peticiones a la API por usuario
 */


export const rate_limit = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const opt = {
            storeClient: await mongoose.connection,
            points: 60, // Número de puntos permitidos
            duration: 120, // Por segundo(s)
        };
    
        const limiter_mongo = new RateLimiterMongo(opt);

        // Consume un punto del límite para la IP actual
        await limiter_mongo.consume(req.ip);

        // Continúa con la siguiente función de middleware
        next();
    } catch (error: any) {
        // Si se excede el límite, responde con un código de estado 429 (Too Many Requests)
        res.status(429).send('Too Many Requests');
    }
}



