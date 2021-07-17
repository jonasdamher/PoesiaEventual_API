'use strict';

type app = {
    version: string;
    mongo_uri: string;
    port: string;
    url: string;
    node_env: string;
}

type nodemailer = {
    email: string;
    password: string;
}

type jwt = {
    secret_token: string;
    secret_refresh_token: string;
}

type config = {
    app: app;
    nodemailer: nodemailer;
    jwt: jwt;
}

export default config;