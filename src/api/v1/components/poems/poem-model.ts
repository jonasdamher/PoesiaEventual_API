'use strict';

import { Model, model, Document, Schema } from 'mongoose';

export interface Poem extends Document {
    author: Schema.Types.ObjectId;
    title: string;
    text: string;
}

// Para añadir funciones extras con mongoose
interface poem_model extends Model<Poem> { }

const poem_schema: Schema<Poem, poem_model> = new Schema({
    author: {
        type: Schema.Types.ObjectId,
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
})

export default model('poems', poem_schema);