'use strict';

import config from '../types/config';
import dotenv from 'dotenv';
dotenv.config();

const configuration: config = {
    app: {
        version: process.env.API_VERSION ?? '',
        mongo_uri: process.env.MONGODB_URI ?? '',
        port: process.env.PORT ?? '',
        url: process.env.BASE_URL ?? '',
        node_env: process.env.NODE_ENV ?? ''
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