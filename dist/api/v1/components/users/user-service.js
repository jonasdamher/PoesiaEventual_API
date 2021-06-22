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
exports.update = exports.refresh_token = exports.signup = exports.login = void 0;
// Modelos
const user_model_1 = __importDefault(require("./user-model"));
// Ayudantes
const authJWT = __importStar(require("../../helpers/jwt"));
const response_data_1 = __importDefault(require("../../helpers/response_data"));
function login(email, password) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const response = response_data_1.default();
        user_model_1.default.findOne({ email: email })
            .select("_id password role name email")
            .then((user) => {
            if (!user) {
                response.status = 404;
                response.message = "User does not exist";
                reject(response);
            }
            user.comparePassword(password).then((ok) => __awaiter(this, void 0, void 0, function* () {
                let dataToken = yield authJWT.create_token(user);
                let userResponse = {
                    access_token: dataToken.access_token,
                    refresh_token: authJWT.create_refresh_token(user),
                    expires_in: dataToken.expire,
                    role: user.role,
                    user: {
                        name: user.name,
                        email: user.email,
                        _id: user.id
                    }
                };
                response.data = userResponse;
                response.is_valid = true;
                resolve(response);
            })).catch((err) => {
                response.status = 401;
                response.message = "Password or Email Invalid";
                reject(response);
            });
        }).catch((err) => {
            response.status = 401;
            response.message = "Password or Email Invalid";
            reject(response);
        });
    }));
}
exports.login = login;
function signup(data_body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const response = response_data_1.default();
        const user = new user_model_1.default(data_body);
        user.save().then((user) => __awaiter(this, void 0, void 0, function* () {
            let dataToken = yield authJWT.create_token(user);
            let userResponse = {
                access_token: dataToken.access_token,
                refresh_token: authJWT.create_refresh_token(user),
                expires_in: dataToken.expire,
                role: user.role,
                user: {
                    name: user.name,
                    email: user.email,
                    _id: user.id
                }
            };
            response.status = 201;
            response.data = userResponse;
            resolve(response);
        })).catch((err) => {
            response.status = 400;
            response.message = "BadRequest";
            reject(response);
        });
    }));
}
exports.signup = signup;
function refresh_token(data) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        authJWT.refresh_token(data).then((token) => {
            response.data = token;
            response.is_valid = true;
            resolve(response);
        }).catch((err) => {
            response.data = err;
            response.status = 400;
            reject(response);
        });
    });
}
exports.refresh_token = refresh_token;
function update(id, data) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        user_model_1.default.findByIdAndUpdate(id, data, { new: true }).then((userResponse) => {
            response.data = userResponse;
            response.is_valid = true;
            resolve(response);
        }).catch((err) => {
            response.data = err;
            response.status = 400;
            reject(response);
        });
    });
}
exports.update = update;
//# sourceMappingURL=user-service.js.map