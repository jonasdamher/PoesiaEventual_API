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
<<<<<<< HEAD
exports.searchPoem = exports.getWithId = void 0;
const joi_1 = __importDefault(require("joi"));
=======
exports.searchPoem = exports.getWithId = exports.getAll = void 0;
const joi_1 = __importDefault(require("joi"));
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            page: joi_1.default.number().integer(),
            perpage: joi_1.default.number().integer().min(1).max(10)
        });
        const data = {
            page: req.query.page,
            perpage: req.query.perpage
        };
        schema.validateAsync(data)
            .then(() => next())
            .catch((err) => res.status(400).json(err));
    });
}
exports.getAll = getAll;
>>>>>>> staging
function getWithId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            id: joi_1.default.string().hex().required()
        });
        const param = { id: req.params.id };
        schema.validateAsync(param)
            .then(() => next())
            .catch((err) => res.status(400).json(err));
    });
}
exports.getWithId = getWithId;
function searchPoem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            search: joi_1.default.string().required(),
            page: joi_1.default.number().integer(),
<<<<<<< HEAD
            perpage: joi_1.default.number().integer()
=======
            perpage: joi_1.default.number().integer().min(1).max(10)
>>>>>>> staging
        });
        const data = {
            search: req.params.search,
            page: req.query.page,
            perpage: req.query.perpage
        };
        schema.validateAsync(data)
            .then(() => next())
            .catch((err) => res.status(400).json(err));
    });
}
exports.searchPoem = searchPoem;
//# sourceMappingURL=poem-validation.js.map