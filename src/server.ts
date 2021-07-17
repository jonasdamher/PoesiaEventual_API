'use strict';

import app from './api/app';
import Mongo from './api/v2/db/Mongo';
import config from './api/v2/config';
import { logger_app } from './api/v2/helpers/logger';

Mongo.connect().then(() => {
    try {
        app.listen(config.app.port);
        console.log(config.app.url);

    } catch (error: unknown) {
        logger_app.info({ error }, 'Run app')
        process.exit(1);
    }
}).catch((error: unknown) => {
    logger_app.error({ error }, 'Mongoose, connect to db')
    process.exit(1);
})
