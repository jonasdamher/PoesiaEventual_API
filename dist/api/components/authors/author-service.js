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
// Modelos
const author_model_1 = __importDefault(require("./author-model"));
// Otros servicios
const books_service_1 = __importDefault(require("../books/books-service"));
const poems_service_1 = __importDefault(require("../poems/poems-service"));
const recognitions_service_1 = __importDefault(require("../recognitions/recognitions-service"));
// Ayudantes
const Text_1 = __importDefault(require("../../helpers/Text"));
const response_data_1 = __importDefault(require("../../utils/response_data"));
const logger_1 = require("../../helpers/logger");
const pagination_1 = require("../../utils/pagination");
class AuthorService {
    get_all_authors(page, perpage) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            (0, pagination_1.get_pagination)(author_model_1.default, page, perpage).then((pagination) => {
                author_model_1.default.find().skip(pagination.page_range).limit(pagination.perpage)
                    .sort('personal.full_name')
                    .select('personal.full_name short_description portrait meta.url')
                    .populate({ path: 'professional.occupations', select: 'name' })
                    .populate({ path: 'professional.literary_genres', select: 'name' })
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
                    logger_1.logger_authors.info(Object.assign({}, response), 'service');
                    reject(response);
                });
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_1.logger_authors.info(Object.assign({}, response), 'service');
                reject(response);
            });
        });
    }
    get_author_by_name(name) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            author_model_1.default.findOne({ 'meta.url': name })
                .select('personal.full_name biography photos meta.url meta.description meta.keywords')
                .populate({ path: 'professional.occupations', select: 'name' })
                .populate({ path: 'professional.literary_genres', select: 'name' })
                .populate({ path: 'personal.country', select: 'name' })
                .then((current_author) => __awaiter(this, void 0, void 0, function* () {
                let recog = new recognitions_service_1.default();
                let poems = new poems_service_1.default();
                let books = new books_service_1.default();
                response.result = {
                    author: current_author,
                    books: yield books.get_books_of_author(current_author._id),
                    poems: yield poems.get_poems_of_author(current_author._id),
                    recognitions: yield recog.get_recognitions_of_author(current_author._id)
                };
                resolve(response);
            })).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_1.logger_authors.info(Object.assign({}, response), 'service');
                reject(response);
            });
        });
    }
    get_author_by_id(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            author_model_1.default.findById(id).then((authorResponse) => {
                response.result = authorResponse;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_1.logger_authors.info(Object.assign({}, response), 'service');
                reject(response);
            });
        });
    }
    search_author(page, perpage, search) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const query = { 'personal.full_name': { $regex: '.*' + search + '.*', $options: 'i' } };
            (0, pagination_1.get_pagination)(author_model_1.default, page, perpage, query).then((pagination) => {
                author_model_1.default.find(query)
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('personal.full_name')
                    .select('personal.full_name short_description portrait meta.url')
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
                    logger_1.logger_authors.info(Object.assign({}, response), 'service');
                    reject(response);
                });
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_1.logger_authors.info(Object.assign({}, response), 'service');
                reject(response);
            });
        });
    }
    random_author() {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            author_model_1.default.find().countDocuments().then((count) => {
                const random = Math.floor(Math.random() * count);
                author_model_1.default.findOne().skip(random).then((author) => {
                    response.result = author;
                    resolve(response);
                }).catch((err) => {
                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    logger_1.logger_authors.info(Object.assign({}, response), 'service');
                    reject(response);
                });
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_1.logger_authors.info(Object.assign({}, response), 'service');
                reject(response);
            });
        });
    }
    create_author(data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            data.personal.full_name = data.personal.name.trim() + ' ' + data.personal.lastname.trim();
            data.meta.url = Text_1.default.url(data.personal.full_name);
            const author = new author_model_1.default(data);
            author.save().then((authorResponse) => {
                response.status = 201;
                response.message = 'Created';
                response.result = authorResponse;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_1.logger_authors.info(Object.assign({}, response), 'service');
                reject(response);
            });
        });
    }
    update_author(id, data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let response = (0, response_data_1.default)();
            // const current_user = await get_by_id(id);
            // if (data.personal.name && data.personal.lastname) {
            //     data.personal.full_name = data.personal.name.trim() + ' ' + data.personal.lastname.trim();
            //     data.meta.url = Text.url(data.personal.full_name);
            // }
            // if (data.personal.name) {
            //     data.personal.full_name = data.personal.name.trim() + ' ' + current_user.data.personal.lastname;
            //     data.meta.url = Text.url(data.personal.full_name);
            // }
            // if (data.personal.lastname) {
            //     data.personal.full_name = current_user.data.personal.name.trim() + ' ' + data.personal.lastname;
            //     data.meta.url = Text.url(data.personal.full_name);
            // }
            author_model_1.default.findByIdAndUpdate(id, data).then((authorResponse) => {
                response.result = authorResponse;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_1.logger_authors.info(Object.assign({}, response), 'service');
                reject(response);
            });
        }));
    }
}
exports.default = AuthorService;
//# sourceMappingURL=author-service.js.map