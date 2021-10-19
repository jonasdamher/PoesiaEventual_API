'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const book_schema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'authors'
    },
    title: {
        type: String,
        required: [true, 'Es obligatorio introducir un título del poema.'],
    },
    synopsis: {
        type: String
    },
    portrait: {
        type: String
    },
    posthumous: {
        type: Boolean,
        default: false
    },
    literary_genre: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'literary_genres'
    },
    editorial: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'editorials'
    },
    published: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Number,
        default: 0
    },
    update_at: {
        type: Number,
        default: 0
    }
});
const BOOK = (0, mongoose_1.model)('books', book_schema);
exports.default = BOOK;
//# sourceMappingURL=books-model.js.map