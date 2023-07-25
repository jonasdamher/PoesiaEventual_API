'use strict';

import mongoose from 'mongoose';
import config from '../config';
import { logger_app } from '../helpers/logger';

/**
 * Para conectarnos a una base de datos de MONGODB
 */
export const connect = mongoose.connect(config.db.mongo_uri);

const gracefulExit = async function (err: Error) {
    await mongoose.connection.close();
    logger_app.error({ err }, 'Mongoose, connect to db');
    process.exit(0);
};

// Si node se cierra, también cierra la conexion mongo
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);