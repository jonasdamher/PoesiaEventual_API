'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modelos
const users_model_1 = __importDefault(require("./users-model"));
const logger_1 = require("../../helpers/logger");
const response_data_1 = __importDefault(require("../../utils/response_data"));
class UsersService {
    getUserById(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            users_model_1.default.findById(id).select('name lastname email').then((res) => {
                response.result = res;
                resolve(response);
            }).catch((err) => {
                response.message = 'Dont found';
                response.status = 404;
                let responseFail = response;
                responseFail.result = err;
                logger_1.logger_users.info(responseFail, 'service');
                reject(response);
            });
        });
    }
    updateUserById(id, data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            users_model_1.default.findByIdAndUpdate(id, data, { new: true }).select('name lastname email ').then((res) => {
                response.message = 'Update';
                reject(response);
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
}
exports.default = UsersService;
//# sourceMappingURL=users-service.js.map