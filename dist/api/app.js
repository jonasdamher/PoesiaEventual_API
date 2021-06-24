'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const limit_mongo_1 = __importDefault(require("./v1/middlewares/limit-mongo"));
const routes_1 = __importDefault(require("./v1/routes"));
const app = express_1.default();
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json({ limit: '60kb' }), (err, req, res, next) => {
    if (err) {
        return res.sendStatus(400);
    }
    next();
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(limit_mongo_1.default);
app.use('/api/v1', routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map