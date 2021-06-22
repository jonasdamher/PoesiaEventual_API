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
moment_1.default.locale('es');
const app = express_1.default();
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
const routes_1 = __importDefault(require("./v1/routes"));
app.use('/api/v1', routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map