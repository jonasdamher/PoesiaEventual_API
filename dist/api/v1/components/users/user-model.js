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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const regex = __importStar(require("../../helpers/regex"));
var roles;
(function (roles) {
    roles[roles["ROLE_ADMIN"] = 0] = "ROLE_ADMIN";
})(roles || (roles = {}));
const user_schema = new mongoose_1.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        match: regex.email,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        match: regex.password,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: [
            "ROLE_ADMIN"
        ],
        required: true
    }
});
const generateHashPassword = (plainPassword) => {
    return bcrypt_1.default.hashSync(plainPassword, bcrypt_1.default.genSaltSync(10));
};
user_schema.pre('save', function (next) {
    try {
        let user = this;
        if (!user.isModified('password')) {
            return next();
        }
        user.password = generateHashPassword(user.password);
        next();
    }
    catch (error) {
        next(error);
    }
});
user_schema.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(candidatePassword, this.password, function (err, isMatch) {
            if (!isMatch) {
                reject(false);
            }
            resolve(isMatch);
        });
    });
};
exports.default = mongoose_1.model('users', user_schema);
//# sourceMappingURL=user-model.js.map