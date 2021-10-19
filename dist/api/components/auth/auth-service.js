'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modelos
const users_model_1 = __importDefault(require("../users/users-model"));
// Ayudantes
const jwt = __importStar(require("../../helpers/jwt"));
const Email_1 = __importDefault(require("../../helpers/Email"));
const logger_1 = require("../../helpers/logger");
const response_data_1 = __importDefault(require("../../utils/response_data"));
// Configuración
const config_1 = __importDefault(require("../../config"));
class AuthService {
    userLogin(email, password) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            users_model_1.default.findOne({ email: email }).then((current_user) => {
                if (!current_user.verified)
                    throw new Error('user not verified');
                current_user.compare_password(password).then((match) => {
                    const token = jwt.create_token(current_user, 'user');
                    response.status = 200;
                    response.result = token;
                    resolve(response);
                }).catch((not_match) => {
                    response.status = 401;
                    response.message = 'Unauthorized';
                    logger_1.logger_users.info(response, 'service');
                    reject(response);
                });
            }).catch((err) => {
                response.status = 401;
                response.message = 'Unauthorized';
                let responseFail = response;
                responseFail.result = err;
                logger_1.logger_users.info(responseFail, 'service');
                reject(response);
            });
        });
    }
    userCreate(data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const user = new users_model_1.default(data);
            user.save().then((res) => {
                const verify_token = jwt.create_token(res, 'verify_account');
                const email = new Email_1.default();
                email.to = res.email;
                email.subject = 'Verifica tu cuenta de usuario';
                email.text = 'Hola,\n' +
                    'Por favor, verifica tu cuenta de usuario haciendo clic en:\n' +
                    config_1.default.app.url_api + 'users\/confirmAccount\/' + verify_token.token + '.\n';
                email.send();
                response.status = 201;
                response.message = 'Created';
                response.result = { _id: res._id };
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                let responseFail = response;
                responseFail.result = err;
                logger_1.logger_users.info(responseFail, 'service');
                reject(response);
            });
        });
    }
    confirmAccountWithToken(token) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            jwt.confirm_token_new_account(token).then((user) => {
                users_model_1.default.findByIdAndUpdate(user._id, { verified: true, $unset: { expire_at: 1 } }).then((res) => {
                    response.message = 'Account verified!!';
                    resolve(response);
                }).catch((err) => {
                    response.status = 400;
                    response.message = 'BadRequest';
                    let responseFail = response;
                    responseFail.result = err;
                    logger_1.logger_users.info(responseFail, 'service');
                    reject(response);
                });
            }).catch((err) => {
                response.status = err.status;
                response.message = err.message;
                let responseFail = response;
                responseFail.result = err;
                logger_1.logger_users.info(responseFail, 'service');
                reject(response);
            });
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth-service.js.map