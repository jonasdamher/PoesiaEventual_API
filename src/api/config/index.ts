'use strict';

import config from '../types/config';
import dotenv from 'dotenv';
dotenv.config();

const url_version = '/api/' + process.env.API_VERSION ?? '';
const url_domain = process.env.DOMAIN ?? '';

const configuration: config = {
    app: {
        version: url_version,
        domain: url_domain,
        url_api: url_domain + url_version,
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