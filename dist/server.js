'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./api/app"));
const Mongo_1 = __importDefault(require("./api/db/Mongo"));
const config_1 = __importDefault(require("./api/config"));
const logger_1 = require("./api/helpers/logger");
Mongo_1.default.connect().then(() => {
    try {
        app_1.default.listen(config_1.default.app.port);
        if (config_1.default.app.node_env === 'DEVELOPMENT') {
            logger_1.logger_app.info({ url: config_1.default.app.url_api }, 'Up server develop');
        }
    }
    catch (error) {
        logger_1.logger_app.info({ error }, 'Run app');
        process.exit(1);
    }
}).catch((error) => {
    logger_1.logger_app.error({ error }, 'Mongoose, connect to db');
    process.exit(1);
});
//# sourceMappingURL=server.js.map