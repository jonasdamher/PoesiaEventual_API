'use strict';

import dotenv from 'dotenv';
dotenv.config();

export default {
    version: process.env.API_VERSION,
    mongo_uri: process.env.MONGODB_URI ?? '',
    port: process.env.PORT,
    node_env:process.env.NODE_ENV,
    jwt: {
        secret_token: process.env.SECRET_TOKEN ?? '',
        refresh_token: process.env.REFRESH_TOKEN ?? ''
    }
}