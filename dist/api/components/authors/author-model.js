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
var genders;
(function (genders) {
    genders[genders["Hombre"] = 0] = "Hombre";
    genders[genders["Mujer"] = 1] = "Mujer";
    genders[genders["No binario"] = 2] = "No binario";
})(genders || (genders = {}));
const author_schema = new mongoose_1.Schema({
    personal: {
        name: {
            type: String,
            validate: {
                validator: (v) => {
                    return regex.text_only.test(v);
                },
                message: (props) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir un nombre.'],
            unique: [true, 'El nombre introducido ya existe.']
        },
        lastname: {
            type: String,
            validate: {
                validator: (v) => {
                    return regex.text_only.test(v);
                },
                message: (props) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir los apellidos.'],
        },
        full_name: {
            type: String
        },
        pseudonym: {
            type: String,
            validate: {
                validator: (v) => {
                    return regex.text_only.test(v);
                },
                message: (props) => `(${props.value}) no tiene el formato adecuado.`
            },
        },
        gender: {
            type: String,
            enum: ['Hombre', 'Mujer', 'No binario'],
            required: true
        },
        country: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'countries'
        }
    },
    professional: {
        occupations: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'occupations'
            }],
        literary_genres: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'literary_genres'
            }],
    },
    short_description: {
        type: String,
        maxLength: 155,
        required: [true, 'Es obligatorio introducir una descripción corta.'],
    },
    biography: {
        type: String,
        maxLength: 700,
        validate: {
            validator: (v) => {
                return regex.text_only.test(v);
            },
            message: (props) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un trext.'],
    },
    portrait: {
        type: String,
        validator: (v) => {
            return regex.photo.test(v);
        },
        required: true
    },
    photos: {
        type: [
            {
                _id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    index: true,
                    required: true,
                    auto: true
                },
                order: Number,
                alt: String,
                desc: String,
                photo: {
                    type: String,
                    validator: (v) => {
                        return regex.photo.test(v);
                    },
                    message: (props) => `(${props.value}) no tiene el formato adecuado.`
                }
            }
        ],
        validate: {
            validator: (v) => {
                return v.length <= 4;
            },
            message: (props) => `(${props.value}) máx 4 imagenes.`
        }
    },
    meta: {
        url: {
            type: String,
            validate: {
                validator: (v) => {
                    return regex.url_name.test(v);
                },
                message: (props) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir un nombre de url.'],
            unique: [true, 'La url introducida ya existe.']
        },
        description: {
            type: String,
            minLength: 70,
            maxLength: 155,
        },
        keywords: [
            {
                _id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    index: true,
                    required: true,
                    auto: true
                },
                word: String
            }
        ],
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
exports.default = (0, mongoose_1.model)('authors', author_schema);
//# sourceMappingURL=author-model.js.map