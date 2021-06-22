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
exports.refresh_token = exports.create_refresh_token = exports.create_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../components/users/user-model"));
function create_token(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const exp_token = moment_1.default().add(7, 'days').unix();
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            sub: user._id,
            role: user.role,
            iat: moment_1.default().unix(),
            exp: exp_token,
        }, config_1.default.jwt.secret_token);
        return {
            access_token: token,
            expire: exp_token
        };
    });
}
exports.create_token = create_token;
function create_refresh_token(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({
            id: user.id,
            sub: user._id,
            role: user.role,
            iat: moment_1.default().unix(),
            exp: moment_1.default().add(15, 'days').unix()
        }, config_1.default.jwt.refresh_token);
    });
}
exports.create_refresh_token = create_refresh_token;
function refresh_token(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (data.refresh_token && data.grant_type === 'refresh_token') {
                jsonwebtoken_1.default.verify(data.refresh_token, config_1.default.jwt.refresh_token, (err, data) => {
                    if (err) {
                        reject({
                            error: "TokenExpired"
                        });
                    }
                    user_model_1.default.findOne({ _id: data.sub }).then((user) => __awaiter(this, void 0, void 0, function* () {
                        if (!user) {
                            reject({
                                error: "TokenExpired"
                            });
                        }
                        let token = yield create_token(user);
                        const data_token = {
                            access_token: token.access_token,
                            refresh_token: yield create_refresh_token(user),
                            expires_in: token.expire,
                            role: user.role
                        };
                        resolve(data_token);
                    })).catch((err) => {
                        reject({
                            error: "TokenExpired"
                        });
                    });
                });
            }
            else {
                reject({
                    error: "BadRequest"
                });
            }
        });
    });
}
exports.refresh_token = refresh_token;
//# sourceMappingURL=jwt.js.map