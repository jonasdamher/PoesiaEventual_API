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
const occupations_validation_1 = __importDefault(require("./occupations-validation"));
const occupations_controller_1 = __importDefault(require("./occupations-controller"));
const auth = __importStar(require("../../middlewares/auth"));
class RouterOcup {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        return this.router
            .get('/', occupations_controller_1.default.get_all)
            .get('/:id', common_validate_1.default.get_by_id, occupations_controller_1.default.get_with_id)
            .post('/', csrf_1.default, auth.user, occupations_validation_1.default.create, occupations_controller_1.default.create);
    }
}
exports.default = new RouterOcup();
//# sourceMappingURL=index.js.map