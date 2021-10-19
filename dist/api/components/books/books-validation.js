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
const joi_1 = __importDefault(require("joi"));
class BooksValidation {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                author: joi_1.default.string().hex().required(),
                title: joi_1.default.string().required(),
                literary_genre: joi_1.default.string().hex().required(),
                editorial: joi_1.default.string().hex().required()
            });
            const data = {
                author: req.body.author,
                title: req.body.title,
                literary_genre: req.body.literary_genre,
                editorial: req.body.editorial
            };
            schema.validateAsync(data)
                .then(() => next())
                .catch((err) => res.status(400).json(err));
        });
    }
}
exports.default = new BooksValidation();
//# sourceMappingURL=books-validation.js.map