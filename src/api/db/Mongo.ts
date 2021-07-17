'use strict';

import mongoose from 'mongoose';
import config from '../config';

class Mongo {
    async connect(): Promise<Boolean | Error> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            };

            mongoose.connect(config.db.mongo_uri, options).then(() => resolve(true))
                .catch((error: Error) => reject(error))
        })
    }
}

export default new Mongo;