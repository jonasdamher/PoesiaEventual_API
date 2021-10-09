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
const poems_service_1 = __importDefault(require("./poems-service"));
class PoemsController extends poems_service_1.default {
    get_all(req, res) {
        const _super = Object.create(null, {
            get_all_poems: { get: () => super.get_all_poems }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, perpage } = req.query;
                let current_page = Number(page !== null && page !== void 0 ? page : 1);
                let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
                const result = yield _super.get_all_poems.call(this, current_page, current_perpage);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    get_by_id(req, res) {
        const _super = Object.create(null, {
            get_poem_by_id_: { get: () => super.get_poem_by_id_ }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield _super.get_poem_by_id_.call(this, id);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    search(req, res) {
        const _super = Object.create(null, {
            search_poem: { get: () => super.search_poem }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, perpage } = req.query;
                const search = req.params.search.trim().toLowerCase();
                let current_page = Number(page !== null && page !== void 0 ? page : 1);
                let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
                const result = yield _super.search_poem.call(this, current_page, current_perpage, search);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    random(req, res) {
        const _super = Object.create(null, {
            random_poem: { get: () => super.random_poem }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _super.random_poem.call(this);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    get_all_poems_of_author(req, res) {
        const _super = Object.create(null, {
            get_all_poems_of_author_by_id: { get: () => super.get_all_poems_of_author_by_id }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, perpage } = req.query;
                const id = req.params.id;
                let current_page = Number(page !== null && page !== void 0 ? page : 1);
                let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
                const result = yield _super.get_all_poems_of_author_by_id.call(this, current_page, current_perpage, id);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    create(req, res) {
        const _super = Object.create(null, {
            create_poem: { get: () => super.create_poem }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data_body = req.body;
                const result = yield _super.create_poem.call(this, data_body);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
}
exports.default = new PoemsController();
//# sourceMappingURL=poems-controller.js.map