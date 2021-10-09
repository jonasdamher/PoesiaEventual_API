'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csrf_1 = __importDefault(require("../../utils/csrf"));
const express_1 = __importDefault(require("express"));
const auth_validation_1 = __importDefault(require("./auth-validation"));
const auth_controller_1 = __importDefault(require("./auth-controller"));
class RouterAuth {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        return this.router
            .post('/', csrf_1.default, auth_validation_1.default.create, auth_controller_1.default.create)
            .post('/login', csrf_1.default, auth_validation_1.default.login, auth_controller_1.default.login)
            .get('/confirm_account/:token', auth_controller_1.default.confirmAccount)
            .get('/csrf', csrf_1.default, (req, res) => {
            return res.json({ csrfToken: req.csrfToken() });
        });
    }
}
exports.default = new RouterAuth();
//# sourceMappingURL=index.js.map