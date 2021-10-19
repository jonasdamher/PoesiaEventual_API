'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url_version = (_a = '/api/' + process.env.API_VERSION) !== null && _a !== void 0 ? _a : '';
const url_domain = (_b = process.env.DOMAIN) !== null && _b !== void 0 ? _b : '';
const configuration = {
    app: {
        version: url_version,
        domain: url_domain,
        url_api: url_domain + url_version,
        port: (_c = process.env.PORT) !== null && _c !== void 0 ? _c : '',
        node_env: (_d = process.env.NODE_ENV) !== null && _d !== void 0 ? _d : ''
    },
    db: {
        mongo_uri: (_e = process.env.MONGODB_URI) !== null && _e !== void 0 ? _e : '',
    },
    nodemailer: {
        email: (_f = process.env.NODEMAILER_EMAIL) !== null && _f !== void 0 ? _f : '',
        password: (_g = process.env.NODEMAILER_PASSWORD) !== null && _g !== void 0 ? _g : ''
    },
    jwt: {
        secret_token: (_h = process.env.SECRET_TOKEN) !== null && _h !== void 0 ? _h : '',
        secret_refresh_token: (_j = process.env.SECRET_REFRESH_TOKEN) !== null && _j !== void 0 ? _j : ''
    }
};
exports.default = configuration;
//# sourceMappingURL=index.js.map