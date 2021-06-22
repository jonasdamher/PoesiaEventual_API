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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.random = exports.searchPoem = exports.getWithId = void 0;
const service = __importStar(require("./poem-service"));
function getWithId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const poem = yield service.getWithId(id);
        return res.status(poem.status).json(poem);
    });
}
exports.getWithId = getWithId;
function searchPoem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, perpage } = req.query;
        const search = req.params.search.trim().toLowerCase();
        let current_page = Number(page !== null && page !== void 0 ? page : 1);
        let current_perpage = Number(perpage !== null && perpage !== void 0 ? perpage : 4);
        const poem = yield service.searchPoem(current_page, current_perpage, search);
        return res.status(poem.status).json(poem);
    });
}
exports.searchPoem = searchPoem;
function random(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const poem = yield service.random();
        return res.status(poem.status).json(poem);
    });
}
exports.random = random;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data_body = req.body;
        const poem = yield service.create(data_body);
        return res.status(poem.status).json(poem);
    });
}
exports.create = create;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const data_body = req.body;
        const poem = yield service.update(id, data_body);
        return res.status(poem.status).json(poem);
    });
}
exports.update = update;
//# sourceMappingURL=poem-controller.js.map