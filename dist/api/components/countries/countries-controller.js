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
const countries_service_1 = __importDefault(require("./countries-service"));
class CountriesController extends countries_service_1.default {
    getAll(req, res) {
        const _super = Object.create(null, {
            getAllCountries: { get: () => super.getAllCountries }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, perpage } = req.query;
                let current_page = Number(page !== null && page !== void 0 ? page : 1);
                let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 10);
                const result = yield _super.getAllCountries.call(this, current_page, current_perpage);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    getWithId(req, res) {
        const _super = Object.create(null, {
            getByIdCountry: { get: () => super.getByIdCountry }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield _super.getByIdCountry.call(this, id);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
    create(req, res) {
        const _super = Object.create(null, {
            createCountry: { get: () => super.createCountry }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data_body = req.body;
                const result = yield _super.createCountry.call(this, data_body);
                return res.status(result.status).json(result);
            }
            catch (error) {
                return res.status(error.status).json(error);
            }
        });
    }
}
exports.default = new CountriesController();
//# sourceMappingURL=countries-controller.js.map