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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csrf_1 = __importDefault(require("../../utils/csrf"));
const express_1 = __importDefault(require("express"));
const common_validate_1 = __importDefault(require("../common/common-validate"));
const poems_validation_1 = __importDefault(require("./poems-validation"));
const poems_controller_1 = __importDefault(require("./poems-controller"));
const auth = __importStar(require("../../middlewares/auth"));
class RouterPoem {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        return this.router
            .get('/', common_validate_1.default.get_all, poems_controller_1.default.get_all)
            .get('/author/:id', poems_controller_1.default.get_all_poems_of_author, poems_controller_1.default.get_all_poems_of_author)
            .get('/:id', common_validate_1.default.get_by_id, poems_controller_1.default.get_by_id)
            .get('/search/:search', common_validate_1.default.search, poems_controller_1.default.search)
            .get('/random', poems_controller_1.default.random)
            .post('/', csrf_1.default, auth.user, poems_validation_1.default.create, poems_controller_1.default.create);
    }
}
exports.default = new RouterPoem();
//# sourceMappingURL=index.js.map