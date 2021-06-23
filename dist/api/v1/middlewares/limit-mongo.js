'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const mongoose_1 = __importDefault(require("mongoose"));
const opts = {
    storeClient: mongoose_1.default.connection,
    points: 10,
    duration: 1 // Per second(s)
};
const limiter_mongo = new rate_limiter_flexible_1.RateLimiterMongo(opts);
const limiter = (req, res, next) => {
    limiter_mongo.consume(req.ip)
        .then(() => next())
        .catch(() => res.status(429).send('Too Many Requests'));
};
exports.default = limiter;
//# sourceMappingURL=limit-mongo.js.map