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
const users_service_1 = __importDefault(require("./users-service"));
class UsersController extends users_service_1.default {
    getById(req, res) {
        const _super = Object.create(null, {
            getUserById: { get: () => super.getUserById }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user._id;
                const result = yield _super.getUserById.call(this, id);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    update(req, res) {
        const _super = Object.create(null, {
            updateUserById: { get: () => super.updateUserById }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data_body = req.body;
                const result = yield _super.updateUserById.call(this, id, data_body);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=users-controller.js.map