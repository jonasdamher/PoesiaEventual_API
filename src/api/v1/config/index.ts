'use strict';

export default {
    version: process.env.API_VERSION,
    mongo_uri: process.env.MONGODB_URI ?? '',
    port: process.env.PORT,
    node_env:process.env.NODE_ENV
}