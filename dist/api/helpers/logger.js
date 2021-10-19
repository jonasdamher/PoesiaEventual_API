'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger_app = exports.logger_email = exports.logger_recognitions = exports.logger_poems = exports.logger_books = exports.logger_authors = exports.logger_users = void 0;
const pino_1 = __importDefault(require("pino"));
const commons_options = {
    sync: false
};
// FOR COMPONENTS
exports.logger_users = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/components/users.json' }, commons_options))).child({ component: 'users' });
exports.logger_authors = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/components/authors.json' }, commons_options))).child({ component: 'users' });
exports.logger_books = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/components/books .json' }, commons_options))).child({ component: 'books ' });
exports.logger_poems = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/components/poems.json' }, commons_options))).child({ component: 'poems' });
exports.logger_recognitions = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/components/recognitions.json' }, commons_options))).child({ component: 'recognitions' });
// FINAL - FOR COMPONENTS
exports.logger_email = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/emails.json' }, commons_options))).child({ component: 'email' });
exports.logger_app = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/app.json' }, commons_options))).child({ component: 'app' });
const logger_node = (0, pino_1.default)(pino_1.default.destination(Object.assign({ dest: './logs/node.json' }, commons_options))).child({ component: 'node' });
process.on('uncaughtException', pino_1.default.final(logger_node, (err, finalLogger) => {
    finalLogger.error({ err }, 'uncaughtException');
    process.exit(1);
}));
process.on('unhandledRejection', pino_1.default.final(logger_node, (err, finalLogger) => {
    finalLogger.error({ err }, 'unhandledRejection');
    process.exit(1);
}));
//# sourceMappingURL=logger.js.map