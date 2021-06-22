'use strict';

import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import limit_mongo from './v1/middlewares/limit-mongo';
import moment from 'moment';

moment.locale('es');
const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limit_mongo);

import routes from './v1/routes';
app.use('/api/v1', routes)

export default app;