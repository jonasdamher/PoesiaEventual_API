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
const genres_service_1 = __importDefault(require("./genres-service"));
class GenresController extends genres_service_1.default {
    get_all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.get_all_genres();
                return res.status(result.status).json(result);
            }
            catch (err) {
                return res.status(err.status).json(err);
            }
        });
    }
    get_with_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.get_genre_by_id(id);
                return res.status(result.status).json(result);
            }
            catch (err) {
                return res.status(err.status).json(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data_body = req.body;
                const result = yield this.create_genre(data_body);
                return res.status(result.status).json(result);
            }
            catch (err) {
                return res.status(err.status).json(err);
            }
        });
    }
}
exports.default = new GenresController();
//# sourceMappingURL=genres-controller.js.map