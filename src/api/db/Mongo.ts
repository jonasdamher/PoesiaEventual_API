'use strict';

import mongoose from 'mongoose';
import config from '../config';

/**
 * Para conectarnos a una base de datos de MONGODB
 */

class Mongo {

    /**
     * Se conecta a la base de datos con las credenciales del archivo .env
     * @returns boolean | error - JSON
     */
    async connect(): Promise<boolean | Error> {
        return new Promise((resolve, reject) => {

            mongoose.connect(config.db.mongo_uri)
                .then(() => resolve(true))
                .catch((error: Error) => reject(error));
        });
    }
}

export default new Mongo();