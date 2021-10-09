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
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const regex = __importStar(require("../../utils/regex"));
const genres_schema = new mongoose_1.Schema({
    name: {
        type: String,
        validate: {
            validator: function (v) {
                return regex.text_only.test(v);
            },
            message: (props) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
        unique: [true, 'El nombre introducido ya existe.']
    },
    description: {
        type: String
    },
    subgenres: [
        {
            _id: {
                type: mongoose_1.Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
            name: String
        },
    ],
    created_at: {
        type: Number,
        default: (0, moment_1.default)().unix()
    },
    update_at: {
        type: Number,
        default: 0
    }
});
exports.default = (0, mongoose_1.model)('literary_genres', genres_schema);
//# sourceMappingURL=genres-model.js.map