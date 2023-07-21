'use strict';

import express, { Application, NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';
import cookieParser from 'cookie-parser';
import timeout from 'connect-timeout';

import config from './config';
import { logger_app } from './helpers/logger';
import { rate_limit } from './middlewares/limit-mongo';

import Routes from './routes';

/**
 * Clase principal de app.
 * Configuración de principales librerías e inicialización de rutas de API.
 */
class App {

    public app: Application = express();

    public constructor() {
        this.configuration();
    }

    private configuration(): void {

        // Configuración fecha formato Español
        moment.locale('es');

        this.app
            .enable('strict routing')
            // Configurar el middleware de tiempo de espera
            .use(timeout('7s'))
            // Usar configuración de limite de peticiones simultaneas
            .use(rate_limit)
            // Limitar los KB de las peticiones
            .use(express.json({ strict: true, limit: '500kb' }), (err: Error, req: Request, res: Response, next: NextFunction) => {
                if (err) {
                    logger_app.info({ err }, 'limit kb body request');
                    return res.sendStatus(400);
                }
                next();
            })
            .use(express.urlencoded({ extended: false }))
            .use(cookieParser())
            .use(compression())
            .use(helmet())
            .use(cors())
            // Ruta principal de endpoints de API
            .use(config.app.version, Routes)
            .use((err: any, req: Request, res: Response, next: NextFunction) => {
                if (err) {
                    if (err.timeout) {
                        res.status(503).send('Request timeout');
                    } else {
                        next(err);
                    }
                } else {
                    next();
                }
            })
            // Mensaje al no encontrar una ruta
            .use((req: Request, res: Response) => {
                return res.status(404).json({ message: 'Not found' });
            })
            // Mensaje personalizado de csrf token al no tenerlo en el cuerpo de la solicitud del endpoint donde se requiere
            .use(function (err: any, req: Request, res: Response, next: NextFunction) {

                if (err.code !== 'EBADCSRFTOKEN') return next(err);

                return res.status(403).json({ message: 'Forbidden token' });
            });
    }
}

export default new App().app;