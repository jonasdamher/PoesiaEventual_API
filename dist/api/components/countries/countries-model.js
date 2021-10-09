'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const countries_schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    ISO: {
        type: String,
        default: null
    }
});
const COUNTRIES = (0, mongoose_1.model)('countries', countries_schema);
exports.default = COUNTRIES;
//# sourceMappingURL=countries-model.js.map