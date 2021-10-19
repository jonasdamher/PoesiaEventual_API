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
exports.confirm_token_new_account = exports.confirm_token = exports.refresh_token = exports.create_refresh_token = exports.create_token = void 0;
/**
 * Para crear y renovar tokens con JWT.
 */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../config"));
const users_model_1 = __importDefault(require("../components/users/users-model"));
/**
 * Crea un token con el nombre, apellidos, id y rol de usuario
 * con la duración de 1 día.
 * @param user
 * @returns Object with token and expire token.
 */
function create_token(user, type_token) {
    const expire_token = (0, moment_1.default)().add(1, 'days').unix();
    const current_data_time = (0, moment_1.default)().unix();
    const data = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        type_token: type_token,
        iat: current_data_time,
        nbf: current_data_time,
        exp: expire_token
    };
    const token = jsonwebtoken_1.default.sign(data, config_1.default.jwt.secret_token);
    return {
        token: token,
        expire_token: expire_token
    };
}
exports.create_token = create_token;
/**
 * Crea un token con el nombre, apellidos, id y rol de usuario
 * con la duración de 2 días.
 * @param user
 * @returns New token.
 */
function create_refresh_token(user) {
    const expire_token = (0, moment_1.default)().add(2, 'days').unix();
    const current_data_time = (0, moment_1.default)().unix();
    const data = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        type_token: 'user',
        iat: current_data_time,
        nbf: current_data_time,
        exp: expire_token
    };
    return jsonwebtoken_1.default.sign(data, config_1.default.jwt.secret_token);
}
exports.create_refresh_token = create_refresh_token;
/**
 * Refresca el token actual pasado por parametros y te devuelve uno nuevo.
 * @param refresh_token Token actual
 * @param grant_type Tipo = refresh_token
 * @param USER modelo de tipo de usuario
 * @returns response with object.
 */
function refresh_token(refresh_token, grant_type, USER) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (refresh_token && grant_type === 'refresh_token') {
                jsonwebtoken_1.default.verify(refresh_token, config_1.default.jwt.secret_refresh_token, (err, data) => {
                    if (err)
                        reject({ status: 400, message: 'TokenExpired' });
                    if (data.type_token !== 'user') {
                        reject({ status: 400, message: 'BadRequest' });
                    }
                    USER.findById(data.sub).select('email name lastname role').then((user) => {
                        if (!user)
                            reject({ status: 401, message: 'TokenExpired' });
                        const { token, expire_token } = create_token(user, 'user');
                        resolve({
                            access_token: token,
                            refresh_token: create_refresh_token(user),
                            expires_in: expire_token
                        });
                    }).catch((err) => {
                        reject({ status: 401, message: 'TokenExpired' });
                    });
                });
            }
            reject({ status: 400, message: 'BadRequest' });
        });
    });
}
exports.refresh_token = refresh_token;
/**
 * Verifica el token y el tipo de token
 * @param token
 * @returns
 */
function confirm_token(token) {
    return new Promise((resolve, reject) => {
        if (token) {
            jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret_token, (err, data) => {
                if (err)
                    reject({ status: 401, message: 'TokenExpired' });
                if (data.type_token !== 'user')
                    reject({ status: 400, message: 'BadRequest' });
                users_model_1.default.findById(data.sub).select('email role').then((user) => {
                    if (!user)
                        reject({ status: 401, message: 'TokenExpired' });
                    resolve(user);
                }).catch((err) => {
                    reject({ status: 401, message: 'TokenExpired' });
                });
            });
        }
        else {
            reject({ status: 400, message: 'BadRequest' });
        }
    });
}
exports.confirm_token = confirm_token;
function confirm_token_new_account(token) {
    return new Promise((resolve, reject) => {
        if (token) {
            jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret_token, (err, data) => {
                if (err)
                    reject({ status: 401, message: 'TokenExpired' });
                if (data.type_token != 'verify_account') {
                    reject({ status: 400, message: 'BadRequest' });
                }
                users_model_1.default.findById(data.sub).select('verified').then((user) => {
                    if (!user)
                        reject({ status: 401, message: 'TokenExpired' });
                    if (user.verified)
                        reject({ status: 401, message: 'User verified' });
                    resolve(user);
                }).catch((err) => {
                    reject({ status: 401, message: 'TokenExpired', result: err });
                });
            });
        }
        else {
            reject({ status: 400, message: 'BadRequest' });
        }
    });
}
exports.confirm_token_new_account = confirm_token_new_account;
//# sourceMappingURL=jwt.js.map