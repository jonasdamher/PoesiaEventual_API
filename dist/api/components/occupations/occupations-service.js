'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modelos
const occupations_model_1 = __importDefault(require("./occupations-model"));
// Ayudantes
const response_data_1 = __importDefault(require("../../utils/response_data"));
class OccupationService {
    get_all_occupations() {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            occupations_model_1.default.find().sort('name').then((res) => {
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
    get_occupation_by_id(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            occupations_model_1.default.findById(id).then((res) => {
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
    create_occupation(data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const new_occupation = new occupations_model_1.default(data);
            new_occupation.save().then((occupation_created) => {
                response.status = 201;
                response.message = 'Created';
                response.result = occupation_created;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
}
exports.default = OccupationService;
//# sourceMappingURL=occupations-service.js.map