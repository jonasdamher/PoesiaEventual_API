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
exports.authAdmin = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../config"));
const user_model_1 = __importDefault(require("../components/users/user-model"));
passport_1.default.use('admin', new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.jwt.secret_token
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role === 'ROLE_ADMIN') {
        user_model_1.default.findById({ _id: payload.id }).then((user) => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        }).catch((error) => {
            return done(error, false);
        });
    }
    else {
        return done(null, false);
    }
})));
const authAdmin = passport_1.default.authenticate('admin', {
    session: false
});
exports.authAdmin = authAdmin;
//# sourceMappingURL=auth.js.map