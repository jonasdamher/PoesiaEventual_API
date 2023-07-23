'use strict';

import { NextFunction, Request, Response } from 'express';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';

const max_fails_login_ip = 100;
const max_fails_login_email = 10;
const max_points_general = 60;

/**
 * Configuración para limitar peticiones a la API por usuario
 */

export const limit_general = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const opt = {
            storeClient: await mongoose.connection,
            keyPrefix: 'rate_limit_general',
            points: max_points_general, // Número de puntos permitidos
            duration: 120, // Por segundo(s)
            blockDuration: 120
        };

        const limiter_mongo = new RateLimiterMongo(opt);
        // Consume un punto del límite para la IP actual
        await limiter_mongo.consume(req.ip);

        next();
    } catch (error: any) {
        // Si se excede el límite, responde con un código de estado 429 (Too Many Requests)
        return res.status(429).send('Too Many Requests');
    }
};

const bruteByIP = async () => {

    return new RateLimiterMongo({
        storeClient: await mongoose.connection,
        keyPrefix: 'login_fail_ip_per_day',
        points: max_fails_login_ip,
        duration: 60 * 60 * 24,
        blockDuration: 60 * 60 * 24
    });
};

export const FailsByEmailAndIP = async () => {

    return new RateLimiterMongo({
        storeClient: await mongoose.connection,
        keyPrefix: 'login_fail_consecutive_email_and_ip',
        points: max_fails_login_email,
        duration: 60 * 60,
        blockDuration: 60 * 60
    });
};

export const limit_login = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const limiterConsecutiveFailsByEmailAndIP = await FailsByEmailAndIP();
        const limiterSlowBruteByIP = await bruteByIP();

        const getEmailIPkey = (email: string, ip: any) => `${email}_${ip}`;

        const ipAddr = req.ip;
        const emailIPkey = getEmailIPkey(req.body.email, ipAddr);

        const [resEmailAndIP, resSlowByIP] = await Promise.all([
            limiterConsecutiveFailsByEmailAndIP.get(emailIPkey),
            limiterSlowBruteByIP.get(ipAddr)
        ]);

        let retrySecs = 0;

        if (
            resSlowByIP !== null &&
            resSlowByIP.consumedPoints > max_fails_login_ip
        ) {
            retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
        } else if (
            resEmailAndIP !== null &&
            resEmailAndIP.consumedPoints > max_fails_login_email
        ) {
            retrySecs = Math.round(resEmailAndIP.msBeforeNext / 1000) || 1;
        }

        if (retrySecs > 0) {
            res.set('Retry-After', String(retrySecs));
            return res.status(429).send(`Too many requests. Retry after ${retrySecs} seconds.`);
        }

        await limiterConsecutiveFailsByEmailAndIP.consume(emailIPkey);
        await limiterSlowBruteByIP.consume(ipAddr);

        next();

    } catch (error: any) {
        // Si se excede el límite, responde con un código de estado 429 (Too Many Requests)
        return res.status(429).send('Too Many Requests');
    }
};


