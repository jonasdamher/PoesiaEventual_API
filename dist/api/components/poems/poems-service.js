'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const poems_model_1 = __importDefault(require("./poems-model"));
// Ayudantes
const logger_1 = require("../../helpers/logger");
const Text_1 = __importDefault(require("../../helpers/Text"));
const pagination_1 = require("../../utils/pagination");
const response_data_1 = __importDefault(require("../../utils/response_data"));
class PoemsService {
    get_all_poems(page, perpage) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            (0, pagination_1.get_pagination)(poems_model_1.default, page, perpage).then((pagination) => {
                poems_model_1.default.find().skip(pagination.page_range).limit(pagination.perpage).sort('name')
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
    get_poems_of_author(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const current_id = id;
            poems_model_1.default.findOne({ author: current_id }).select('title meta.url').then((poems) => {
                if (!poems)
                    resolve([]);
                if (poems.length > 1)
                    resolve(poems);
                resolve([poems]);
            }).catch((err) => {
                logger_1.logger_poems.info(err, 'service');
                reject([]);
            });
        });
    }
    get_all_poems_of_author_by_id(page, perpage, id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const current_id = id;
            let query = { author: current_id };
            (0, pagination_1.get_pagination)(poems_model_1.default, page, perpage, query).then((pagination) => {
                poems_model_1.default.find(query)
                    .populate('author')
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('title')
                    .then(poemList => {
                    response.result = {
                        poems: poemList,
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
    get_poem_by_id_(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            poems_model_1.default.findById({ _id: id }).populate('author', 'name').then((poem) => {
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
    search_poem(page, perpage, search) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            let query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };
            (0, pagination_1.get_pagination)(poems_model_1.default, page, perpage, query)
                .then((pagination) => {
                poems_model_1.default.find(query).populate('author').skip(pagination.page_range).limit(pagination.perpage).sort('title')
                    .then((poems) => {
                    response.result = {
                        poems: poems,
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
    random_poem() {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            poems_model_1.default.find().countDocuments().then(count => {
                const random = Math.floor(Math.random() * count);
                poems_model_1.default.findOne().populate('author', 'name').skip(random).then((poem) => {
                    response.result = poem;
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
    create_poem(data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            data.meta.url = Text_1.default.url(data.title);
            const poem = new poems_model_1.default(data);
            poem.save().then((new_poem) => {
                response.status = 201;
                response.message = 'Created';
                response.result = new_poem;
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
exports.default = PoemsService;
//# sourceMappingURL=poems-service.js.map