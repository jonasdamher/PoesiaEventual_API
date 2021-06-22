'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    version: process.env.API_VERSION,
    mongo_uri: (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : '',
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    jwt: {
        secret_token: (_b = process.env.SECRET_TOKEN) !== null && _b !== void 0 ? _b : '',
        refresh_token: (_c = process.env.REFRESH_TOKEN) !== null && _c !== void 0 ? _c : ''
    }
};
//# sourceMappingURL=index.js.map