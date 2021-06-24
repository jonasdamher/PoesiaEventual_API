'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoemsList = exports.random = exports.searchAuthor = exports.getWithId = exports.getAll = void 0;
// Modelos
const author_model_1 = __importDefault(require("./author-model"));
const poem_model_1 = __importDefault(require("../poems/poem-model"));
// Ayudantes
const response_data_1 = __importDefault(require("../../helpers/response_data"));
function getAll(page, perpage) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        let current_page = Math.max(0, page);
        let pageNum = current_page;
        --current_page;
        author_model_1.default.find().countDocuments().then((count) => {
            const limit = Math.ceil(count / perpage);
            author_model_1.default.find()
                .skip(perpage * current_page)
                .limit(perpage)
                .sort('name')
                .then((authorResponse) => {
                let data = {
                    authors: authorResponse,
                    pagination: {
                        perPage: perpage,
                        page: pageNum,
                        lastPage: limit,
                        total: count
                    }
                };
                response.data = data;
                response.is_valid = true;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.data = err;
                reject(response);
            });
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.getAll = getAll;
function getWithId(id) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        author_model_1.default.findById(id).then((authorResponse) => {
            response.data = authorResponse;
            response.is_valid = true;
            resolve(response);
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.getWithId = getWithId;
function searchAuthor(page, perpage, search) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        let current_page = Math.max(0, page);
        let pageNum = current_page;
        --current_page;
        author_model_1.default.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } })
            .countDocuments().then((count) => {
            const limit = Math.ceil(count / perpage);
            author_model_1.default.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } })
                .skip(perpage * current_page)
                .limit(perpage)
                .sort('name')
                .then((authorResponse) => {
                let data = {
                    authors: authorResponse,
                    pagination: {
                        perPage: perpage,
                        page: pageNum,
                        lastPage: limit,
                        total: count
                    }
                };
                response.data = data;
                response.is_valid = true;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.data = err;
                reject(response);
            });
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.searchAuthor = searchAuthor;
function random() {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        author_model_1.default.find().countDocuments().then((count) => {
            const random = Math.floor(Math.random() * count);
            author_model_1.default.findOne().skip(random).then((author) => {
                response.is_valid = true;
                response.data = author;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.data = err;
                reject(response);
            });
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.random = random;
function getPoemsList(page, perpage, id) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        const current_id = id;
        let current_page = Math.max(0, page);
        let pageNum = current_page;
        --current_page;
        poem_model_1.default.find({ author: current_id }).countDocuments().then((count) => {
            const limit = Math.ceil(count / perpage);
            poem_model_1.default.find({ author: current_id })
                .populate('author')
                .skip(perpage * page)
                .limit(perpage)
                .sort('title')
                .then(poemList => {
                let data = {
                    poems: poemList,
                    pagination: {
                        perPage: perpage,
                        page: pageNum,
                        lastPage: limit,
                        total: count
                    }
                };
                response.is_valid = true;
                response.data = data;
                resolve(response);
            }).catch((err) => {
                response.status = 400;
                response.data = err;
                reject(response);
            });
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.getPoemsList = getPoemsList;
//# sourceMappingURL=author-service.js.map