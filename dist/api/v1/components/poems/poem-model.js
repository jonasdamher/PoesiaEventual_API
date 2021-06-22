'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const poem_schema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'authors'
    },
    title: {
        type: String,
        required: [true, 'Es obligatorio introducir un título del poema.'],
    },
    text: {
        type: String,
        required: [true, 'Es obligatorio introducir un cuerpo del poema.'],
    }
});
exports.default = mongoose_1.model('poems', poem_schema);
//# sourceMappingURL=poem-model.js.map