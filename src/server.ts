'use strict';

import app from './api/app';
import Mongo from './api/db/Mongo';
import config from './api/config';
import { logger_app } from './api/helpers/logger';

Mongo.connect().then(() => {
    try {
        app.listen(config.app.port);

        if (config.app.node_env === 'DEVELOPMENT') {
            logger_app.info({ url: config.app.url_api() }, 'Up server develop')
        }

    } catch (error: unknown) {
        console.log(error);

        logger_app.info({ error }, 'Error app')
        process.exit(1);
    }
}).catch((error: Error) => {
    console.log(error);

    logger_app.error({ error }, 'Mongoose, connect to db')
    process.exit(1);
})
