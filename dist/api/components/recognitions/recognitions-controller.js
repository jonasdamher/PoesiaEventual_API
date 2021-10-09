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
const recognitions_service_1 = __importDefault(require("./recognitions-service"));
class RecogController extends recognitions_service_1.default {
    get_all(req, res) {
        const _super = Object.create(null, {
            get_all_recog: { get: () => super.get_all_recog }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perpage } = req.query;
            let current_page = Number(page !== null && page !== void 0 ? page : 1);
            let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
            _super.get_all_recog.call(this, current_page, current_perpage)
                .then((ok) => res.status(ok.status).json(ok))
                .catch((err) => res.status(err.status).json(err));
        });
    }
    get_by_id(req, res) {
        const _super = Object.create(null, {
            get_recog_by_id: { get: () => super.get_recog_by_id }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            _super.get_recog_by_id.call(this, id)
                .then((ok) => res.status(ok.status).json(ok))
                .catch((err) => res.status(err.status).json(err));
        });
    }
    search(req, res) {
        const _super = Object.create(null, {
            search_recogs: { get: () => super.search_recogs }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { page, perpage } = req.query;
            const search = req.params.search.trim().toLowerCase();
            let current_page = Number(page !== null && page !== void 0 ? page : 1);
            let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
            _super.search_recogs.call(this, current_page, current_perpage, search)
                .then((ok) => res.status(ok.status).json(ok))
                .catch((err) => res.status(err.status).json(err));
        });
    }
    create(req, res) {
        const _super = Object.create(null, {
            create_recog: { get: () => super.create_recog }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data_body = req.body;
                const result = yield _super.create_recog.call(this, data_body);
                res.status(result.status).json(result);
            }
            catch (error) {
                res.status(error.status).json(error);
            }
        });
    }
}
exports.default = new RecogController();
//# sourceMappingURL=recognitions-controller.js.map