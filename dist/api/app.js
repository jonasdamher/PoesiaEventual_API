'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const moment_1 = __importDefault(require("moment"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./helpers/logger");
const limit_mongo_1 = __importDefault(require("./middlewares/limit-mongo"));
const routes_1 = __importDefault(require("./routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
    }
    configuration() {
        moment_1.default.locale('es');
        this.app
            .use(express_1.default.json({ strict: true, limit: '90kb' }), (err, req, res, next) => {
            if (err) {
                logger_1.logger_app.info({ err }, 'limit kb body request');
                return res.sendStatus(400);
            }
            next();
        })
            .use(express_1.default.urlencoded({ extended: false }))
            .use((0, cookie_parser_1.default)())
            .use((0, compression_1.default)())
            .use((0, helmet_1.default)())
            .use((0, cors_1.default)())
            .use(limit_mongo_1.default)
            .use(config_1.default.app.version, routes_1.default)
            .use((req, res, next) => {
            return res.status(404).json({ message: 'Not found' });
        })
            .use(function (err, req, res, next) {
            if (err.code !== 'EBADCSRFTOKEN') {
                return next(err);
            }
            return res.status(403).json({ message: 'Forbidden token' });
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map