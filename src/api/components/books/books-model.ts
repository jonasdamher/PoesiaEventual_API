'use strict';

import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

export interface Book extends Document {
    author: Schema.Types.ObjectId;
    title: string;
    synopsis: string;
    portrait: string;
    posthumous: boolean;
    literary_genre: Schema.Types.ObjectId;
    editorial: Schema.Types.ObjectId;
    published: number;
    created_at: number;
    update_at: number;
}

// Para añadir funciones extras con mongoose
interface book_model extends Model<Book> { }

const book_schema: Schema<Book, book_model> = new Schema({
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
    posthumous: {
        type: Boolean,
        default: false
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
    created_at: {
        type: Number,
        default: 0
    },
    update_at: {
        type: Number,
        default: 0
    }
})

export default model<Book, book_model>('books', book_schema);