'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const joi_1 = __importDefault(require("joi"));
const regex = __importStar(require("../../utils/regex"));
const logger_1 = require("../../helpers/logger");
class AuthorValidation {
    get_by_name(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default.string().regex(regex.url_name).required()
            });
            const param = { name: req.params.name };
            schema.validateAsync(param)
                .then(() => next())
                .catch((err) => {
                logger_1.logger_authors.info({ err }, 'validation');
                return res.status(400).json(err);
            });
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required(),
                lastname: joi_1.default.string().required(),
                full_name: joi_1.default.string(),
                pseudonym: joi_1.default.string(),
                gender: joi_1.default.string().required(),
                country: joi_1.default.string().hex().required(),
                short_description: joi_1.default.string().max(155).required(),
                biography: joi_1.default.string().max(700).required(),
                portrait: joi_1.default.string().required(),
                description: joi_1.default.string().max(155).required(),
            });
            const data = {
                name: req.body.personal.name,
                lastname: req.body.personal.lastname,
                full_name: req.body.personal.full_name,
                pseudonym: req.body.personal.pseudonym,
                gender: req.body.personal.gender,
                country: req.body.personal.country,
                short_description: req.body.short_description,
                biography: req.body.biography,
                portrait: req.body.portrait,
                description: req.body.meta.description,
            };
            schema.validateAsync(data)
                .then(() => next())
                .catch((err) => {
                logger_1.logger_authors.info({ err }, 'validation');
                return res.status(400).json(err);
            });
        });
    }
}
exports.default = new AuthorValidation();
//# sourceMappingURL=author-validation.js.map