'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countries_model_1 = __importDefault(require("./countries-model"));
// Ayudantes
const response_data_1 = __importDefault(require("../../utils/response_data"));
class CountriesService {
    getAllCountries(page, perpage) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            let current_page = Math.max(0, page);
            let pageNum = current_page;
            --current_page;
            countries_model_1.default.find().countDocuments().then((count) => {
                const limit = Math.ceil(count / perpage);
                countries_model_1.default.find({ language: 'es' })
                    .skip(perpage * current_page)
                    .limit(perpage)
                    .sort('name')
                    .then((authorResponse) => {
                    let data = {
                        countries: authorResponse,
                        pagination: {
                            perPage: perpage,
                            page: pageNum,
                            lastPage: limit,
                            total: count
                        }
                    };
                    response.result = data;
                    resolve(response);
                }).catch((err) => {
                    response.status = 400;
                    response.result = err;
                    reject(response);
                });
            }).catch((err) => {
                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }
    getByIdCountry(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            countries_model_1.default.findById({ _id: id }).then((poem) => {
                response.result = poem;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }
    createCountry(data) {
        return new Promise((resolve, reject) => {
            const response = (0, response_data_1.default)();
            const country = new countries_model_1.default(data);
            country.save().then((new_poem) => {
                response.status = 201;
                response.result = new_poem;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }
}
exports.default = CountriesService;
//# sourceMappingURL=countries-service.js.map