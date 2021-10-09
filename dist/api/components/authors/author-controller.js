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
const author_service_1 = __importDefault(require("./author-service"));
class AuthorController extends author_service_1.default {
    get_all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, perpage } = req.query;
                let current_page = Number(page !== null && page !== void 0 ? page : 1);
                let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
                const result = yield this.get_all_authors(current_page, current_perpage);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    get_by_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.get_author_by_id(id);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    get_by_name(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.params.name;
                const result = yield this.get_author_by_name(name);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, perpage } = req.query;
                const search = req.params.search.trim().toLowerCase();
                let current_page = Number(page !== null && page !== void 0 ? page : 1);
                let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
                const result = yield this.search_author(current_page, current_perpage, search);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    random(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.random_author();
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data_body = req.body;
                const result = yield this.create_author(data_body);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data_body = req.body;
                const result = yield this.update_author(id, data_body);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
}
exports.default = new AuthorController();
//# sourceMappingURL=author-controller.js.map