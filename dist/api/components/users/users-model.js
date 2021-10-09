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
const moment_1 = __importDefault(require("moment"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const regex = __importStar(require("../../utils/regex"));
const logger_1 = require("../../helpers/logger");
var roles;
(function (roles) {
    roles[roles["ROLE_ADMIN"] = 0] = "ROLE_ADMIN";
    roles[roles["ROLE_BASIC"] = 1] = "ROLE_BASIC";
})(roles || (roles = {}));
const user_schema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return regex.text_only.test(v);
            },
            message: (props) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
    },
    lastname: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return regex.text_only.test(v);
            },
            message: (props) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return regex.email.test(v);
            },
            message: (props) => `(${props.value}) no tiene el formato adecuado.`
        },
        immutable: true,
        unique: true,
        required: [true, 'Es obligatorio introducir un nombre.'],
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        validate: {
            validator: (v) => {
                return regex.password.test(v);
            },
            message: (props) => `(${props.value}) no tiene el formato adecuado, al menos 1 mayuscula, 1 numero y 1 simbolo especial.`
        },
        required: [true, 'Es obligatorio introducir una contraseña.'],
    },
    role: {
        type: String,
        trim: true,
        enum: [
            'ROLE_ADMIN',
            'ROLE_BASIC'
        ],
        required: true
    },
    expire_at: {
        type: Date,
        default: Date.now,
        // (1440m) 24 horas para que expire el documento y se 
        // elimine si no se confirma la cuenta por correo electrónico.
        index: { expires: '1440m' }
    },
    created_at: {
        type: Number,
        default: (0, moment_1.default)().unix()
    },
    update_at: {
        type: Number,
        default: 0
    }
});
user_schema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = 12;
    bcrypt_1.default.hash(this.password, salt, (err, hash) => {
        if (err) {
            logger_1.logger_users.info({ err }, 'model');
        }
        this.password = hash;
        next();
    });
});
user_schema.methods.compare_password = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(password, this.password, (err, match) => {
                if (!match) {
                    reject(match);
                }
                resolve(match);
            });
        });
    });
};
const USER = (0, mongoose_1.model)('users', user_schema);
exports.default = USER;
//# sourceMappingURL=users-model.js.map