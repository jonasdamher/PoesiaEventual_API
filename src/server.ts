'use strict';

import app from './api/app';
import { connect } from './api/db/Mongo';
import config from './api/config';
import { logger_app } from './api/helpers/logger';

connect.then(() => {
    try {
        app.listen(config.app.port);

    } catch (error: Error | unknown) {

        logger_app.error({ error }, 'Error app');
        process.exit(1);
    }
}).catch(async (error: Error) => {
    logger_app.error({ error }, 'Mongoose, connect to db');
    process.exit(1);
});
