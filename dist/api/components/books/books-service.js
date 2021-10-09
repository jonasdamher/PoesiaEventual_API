'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_model_1 = __importDefault(require("./books-model"));
// Ayudantes
const logger_1 = require("../../helpers/logger");
const pagination_1 = require("../../utils/pagination");
const response_data_1 = __importDefault(require("../../utils/response_data"));
class BooksService {
    get_all_books(page, perpage) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            (0, pagination_1.get_pagination)(books_model_1.default, page, perpage).then((pagination) => {
                books_model_1.default.find()
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('title')
                    .select('title')
                    .populate({ path: 'author', select: 'personal.full_name meta.url' })
                    .populate({ path: 'editorial', select: 'name' })
                    .populate({ path: 'literary_genre', select: 'name' })
                    .then((book_list) => {
                    let data = {
                        books: book_list,
                        pagination: (0, pagination_1.paginate)(pagination)
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
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }
    get_book_by_id(id) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            books_model_1.default.findById({ _id: id })
                .select('title')
                .populate({ path: 'author', select: 'personal.full_name meta.url' })
                .populate({ path: 'editorial', select: 'name' })
                .populate({ path: 'literary_genre', select: 'name' })
                .then((poem) => {
                response.result = poem;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }
    get_books_of_author(id) {
        return new Promise((resolve, reject) => {
            const current_id = id;
            books_model_1.default.findOne({ author: current_id })
                .select('title meta.url published posthumous')
                .populate({ path: 'editorial', select: 'name' })
                .populate({ path: 'literary_genre', select: 'name' })
                .then((books) => {
                if (!books) {
                    resolve([]);
                }
                if (books.length > 1) {
                    resolve(books);
                }
                resolve([books]);
            }).catch((err) => {
                logger_1.logger_books.info(err, 'service');
                reject([]);
            });
        });
    }
    search_book(page, perpage, search) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };
            (0, pagination_1.get_pagination)(books_model_1.default, page, perpage, query).then((pagination) => {
                books_model_1.default.find(query)
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('title')
                    .populate('author editorial literary_genre')
                    .then((poems) => {
                    let data = {
                        poems: poems,
                        pagination: (0, pagination_1.paginate)(pagination)
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
    create_book(data) {
        return new Promise((resolve, reject) => {
            let response = (0, response_data_1.default)();
            const book = new books_model_1.default(data);
            book.save().then((poem) => {
                response.result = poem;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }
}
exports.default = BooksService;
//# sourceMappingURL=books-service.js.map