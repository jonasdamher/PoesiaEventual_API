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
exports.update = exports.refresh_token = exports.signup = exports.login = void 0;
// Servicios
const service = __importStar(require("./user-service"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield service.login(email, password);
        return res.status(user.status).json(user);
    });
}
exports.login = login;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = req.body;
        const user = yield service.signup(data);
        return res.status(user.status).json(user);
    });
}
exports.signup = signup;
function refresh_token(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            refresh_token: req.body.refresh_token,
            grant_type: req.body.grant_type
        };
        const user = yield service.refresh_token(data);
        return res.status(user.status).json(user);
    });
}
exports.refresh_token = refresh_token;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const data_body = req.body;
        const user = yield service.update(id, data_body);
        return res.status(user.status).json(user);
    });
}
exports.update = update;
//# sourceMappingURL=user-controller.js.map