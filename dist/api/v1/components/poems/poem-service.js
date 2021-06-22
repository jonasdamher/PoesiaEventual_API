'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.random = exports.searchPoem = exports.getWithId = void 0;
const poem_model_1 = __importDefault(require("./poem-model"));
// Ayudantes
const response_data_1 = __importDefault(require("../../helpers/response_data"));
function getWithId(id) {
    return new Promise((resolve, reject) => {
        let response = response_data_1.default();
        poem_model_1.default.findById({ _id: id }).populate('author', 'name').then((poem) => {
            response.is_valid = true;
            response.data = poem;
            resolve(response);
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.getWithId = getWithId;
function searchPoem(page, perpage, search) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        let current_page = Math.max(0, page);
        let pageNum = current_page;
        --current_page;
        poem_model_1.default.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(count => {
            const limit = Math.ceil(count / perpage);
            poem_model_1.default.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } })
                .populate('author')
                .skip(perpage * current_page)
                .limit(perpage)
                .sort('title')
                .then((poems) => {
                let data = {
                    poems: poems,
                    pagination: { perPage: perpage, page: pageNum, lastPage: limit, total: count }
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
exports.searchPoem = searchPoem;
function random() {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        poem_model_1.default.find().countDocuments().then(count => {
            const random = Math.floor(Math.random() * count);
            poem_model_1.default.findOne().populate('author', 'name').skip(random).then(poem => {
                response.is_valid = true;
                response.data = poem;
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
function create(data_body) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        const poem = new poem_model_1.default(data_body);
        poem.save().then(poem => {
            response.status = 201;
            response.is_valid = true;
            response.data = poem;
            resolve(response);
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.create = create;
function update(id, data_body) {
    return new Promise((resolve, reject) => {
        const response = response_data_1.default();
        poem_model_1.default.findByIdAndUpdate(id, data_body, { new: true }).then((authorResponse) => {
            response.is_valid = true;
            response.data = authorResponse;
            resolve(response);
        }).catch((err) => {
            response.status = 400;
            response.data = err;
            reject(response);
        });
    });
}
exports.update = update;
//# sourceMappingURL=poem-service.js.map