'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recognitions_model_1 = __importDefault(require("./recognitions-model"));
// Ayudantes
const logger_1 = require("../../helpers/logger");
const Text_1 = __importDefault(require("../../helpers/Text"));
const response_data_1 = __importDefault(require("../../utils/response_data"));
const pagination_1 = require("../../utils/pagination");
class RecogService {
    get_all_recog(page, perpage) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            (0, pagination_1.get_pagination)(recognitions_model_1.default, page, perpage).then((pagination) => {
                recognitions_model_1.default.find().skip(pagination.page_range).limit(pagination.perpage).sort('name')
                    .then((authorResponse) => {
                    response.result = {
                        authors: authorResponse,
                        pagination: (0, pagination_1.paginate)(pagination)
                    };
                    resolve(response);
                }).catch((err) => {
                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    reject(response);
                });
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
    get_recog_by_id(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            recognitions_model_1.default.findById(id).populate('author', 'name').then((poem) => {
                response.result = poem;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
    search_recogs(page, perpage, search) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            let query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };
            (0, pagination_1.get_pagination)(recognitions_model_1.default, page, perpage, query).then((pagination) => {
                recognitions_model_1.default.find(query).populate('author').skip(pagination.page_range).limit(pagination.perpage).sort('title')
                    .then((poems) => {
                    let result = {
                        poems: poems,
                        pagination: (0, pagination_1.paginate)(pagination)
                    };
                    response.result = result;
                    resolve(response);
                }).catch((err) => {
                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    reject(response);
                });
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
    get_recognitions_of_author(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const current_id = id;
            recognitions_model_1.default.findOne({ author: current_id })
                .select('title age posthumous meta.url')
                .then((recognitions) => {
                if (!recognitions) {
                    resolve([]);
                }
                if (recognitions.length > 1) {
                    resolve(recognitions);
                }
                resolve([recognitions]);
            }).catch((err) => {
                logger_1.logger_recognitions.info(err, 'service');
                reject([]);
            });
        });
    }
    create_recog(data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            data.meta.url = Text_1.default.url(data.title);
            const poem = new recognitions_model_1.default(data);
            poem.save().then((new_poem) => {
                response.status = 201;
                response.result = new_poem;
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
exports.default = RecogService;
//# sourceMappingURL=recognitions-service.js.map