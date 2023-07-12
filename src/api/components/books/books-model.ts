'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';

export interface Book extends Document {
    author: Schema.Types.ObjectId;
    title: string;
    synopsis?: string;
    portrait?: string;
    literary_genre: Schema.Types.ObjectId;
    editorial: Schema.Types.ObjectId;
    published: number;
    createdAt: number;
    updatedAt: number;
}

const book_schema: Schema<Book> = new Schema({
    author: {
        type: Schema.Types.ObjectId,
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
    literary_genre: {
        type: Schema.Types.ObjectId,
        ref: 'literary_genres'
    },
    editorial: {
        type: Schema.Types.ObjectId,
        ref: 'editorials'
    },
    published: {
        type: Number,
        default: 0
    },
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
});

const BOOK: Model<Book> = model('books', book_schema);
export default BOOK;