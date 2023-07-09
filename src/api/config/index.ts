'use strict';

import config from '../types/config';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Configuración general obtenida del archivo .env
 * Parametros de configuración
 * 
 * Clave secreta json web token
 * Correo, clave envio correos electrónicos 
 */

const configuration: config = {
    app: {
        domain: process.env.DOMAIN ?? '',
        version: '/api/' + process.env.API_VERSION ?? '',
        url_api: function (): string {
            return this.domain + this.version;
        },
        port: process.env.PORT ?? '',
        node_env: process.env.NODE_ENV ?? ''
    },
    db: {
        mongo_uri: process.env.MONGODB_URI ?? '',
    },
    nodemailer: {
        email: process.env.NODEMAILER_EMAIL ?? '',
        password: process.env.NODEMAILER_PASSWORD ?? ''
    },
    jwt: {
        secret_token: process.env.SECRET_TOKEN ?? '',
        secret_refresh_token: process.env.SECRET_REFRESH_TOKEN ?? ''
    }
};

export default configuration;