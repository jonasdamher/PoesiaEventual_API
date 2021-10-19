'use strict';

type app = {
    version: string;
    domain: string;
    url_api: string;
    port: string;
    node_env: string;
}

type db = {
    mongo_uri: string;
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
    db: db;
    nodemailer: nodemailer;
    jwt: jwt;
}

export default config;