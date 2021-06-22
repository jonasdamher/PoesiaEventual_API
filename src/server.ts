'use strict';

import mongoose from 'mongoose';
import app from './api/app';
import config from './api/v1/config';

mongoose.connect(config.mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    try {
        app.listen(config.port);
    } catch (error:unknown) {
        console.log(error);
        process.exit(1);
    }
}).catch((err: unknown) => {
    console.log(err);
    process.exit(1);
})