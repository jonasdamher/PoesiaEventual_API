'use strict';

import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import limit_mongo from './v1/middlewares/limit-mongo';
import routes from './v1/routes';

const app = express();
 
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '60kb' }), (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        return res.sendStatus(400);
    }
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(limit_mongo);

app.use('/api/v1', routes);

export default app;