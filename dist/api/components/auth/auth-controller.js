'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth-service"));
class AuthController extends auth_service_1.default {
    login(req, res) {
        const _super = Object.create(null, {
            userLogin: { get: () => super.userLogin }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield _super.userLogin.call(this, email, password);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    create(req, res) {
        const _super = Object.create(null, {
            userCreate: { get: () => super.userCreate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data_body = req.body;
                const result = yield _super.userCreate.call(this, data_body);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    confirmAccount(req, res) {
        const _super = Object.create(null, {
            confirmAccountWithToken: { get: () => super.confirmAccountWithToken }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.params;
                const result = yield _super.confirmAccountWithToken.call(this, token);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth-controller.js.map