'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modelos
const editorials_model_1 = __importDefault(require("./editorials-model"));
// Ayudantes
const response_data_1 = __importDefault(require("../../utils/response_data"));
class EditorialsService {
    get_all_editorials() {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            editorials_model_1.default.find().sort('name').then((res) => {
                response.result = res;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
    get_editorial_by_id(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            editorials_model_1.default.findById(id).then((res) => {
                response.result = res;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
    create_editorial(data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const new_genre = new editorials_model_1.default(data);
            new_genre.save().then((res) => {
                response.status = 201;
                response.message = 'Created';
                response.result = res;
                reject(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
}
exports.default = EditorialsService;
//# sourceMappingURL=editorials-service.js.map