'use strict';

import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';
import { logger_app } from './v2/helpers/logger';

import limit_mongo from './v2/middlewares/limit-mongo';
import routes from './v2/routes';

const app = express();

moment.locale('es');
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '90kb' }), (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        logger_app.info({ err }, 'limit kb body request');
        return res.sendStatus(400);
    }
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(limit_mongo);

app.use('/api/v2', routes);

export default app;