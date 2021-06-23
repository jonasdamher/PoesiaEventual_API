'use strict';
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    version: process.env.API_VERSION,
    mongo_uri: (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : '',
    port: process.env.PORT,
    node_env: process.env.NODE_ENV
};
//# sourceMappingURL=index.js.map