'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modelos
const genres_model_1 = __importDefault(require("./genres-model"));
// Ayudantes
const ResponseHandler_1 = __importDefault(require("../../helpers/ResponseHandler"));
class GenresService extends ResponseHandler_1.default {
    get_all_genres() {
        return new Promise((resolve, reject) => {
            genres_model_1.default.find().sort('name').then((res) => {
                this.result(res);
                resolve(this.response());
            }).catch((err) => {
                this.status(404).message('Dont found').result(err);
                reject(this.response());
            });
        });
    }
    get_genre_by_id(id) {
        return new Promise((resolve, reject) => {
            genres_model_1.default.findById(id).then((res) => {
                this.result(res);
                resolve(this.response());
            }).catch((err) => {
                this.status(404).message('Dont found').result(err);
                reject(this.response());
            });
        });
    }
    create_genre(data) {
        return new Promise((resolve, reject) => {
            const new_genre = new genres_model_1.default(data);
            new_genre.save().then((res) => {
                this.status(201).message('Created').result(res);
                resolve(this.response());
            }).catch((err) => {
                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            });
        });
    }
}
exports.default = GenresService;
//# sourceMappingURL=genres-service.js.map