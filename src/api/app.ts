'use strict';

import express, { Router, Application, NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';

import config from './config';
import { logger_app } from './helpers/logger';
import limit_mongo from './middlewares/limit-mongo';

import Routes from './routes';


class App {

    public app: Application = express();

    public constructor() {
        this.configuration();
    }

    private configuration(): void {

        moment.locale('es');

        this.app
            .use(compression())
            .use(helmet())
            .use(cors())
            .use(express.json({ limit: '90kb' }), (err: Error, req: Request, res: Response, next: NextFunction) => {
                if (err) {
                    logger_app.info({ err }, 'limit kb body request');
                    return res.sendStatus(400);
                }
                next();
            })
            .use(express.urlencoded({ extended: false }))
            .use(limit_mongo)
            .use(config.app.version, Routes);
    }
}

export default new App().app;