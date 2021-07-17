'use strict';

import app from './api/app';
import Mongo from './api/db/Mongo';
import config from './api/config';
import { logger_app } from './api/helpers/logger';

Mongo.connect().then(() => {
    try {
        app.listen(config.app.port);
        console.log(config.app.url_api);

    } catch (error: unknown) {
        logger_app.info({ error }, 'Run app')
        process.exit(1);
    }
}).catch((error: Error) => {
    logger_app.error({ error }, 'Mongoose, connect to db')
    process.exit(1);
})
