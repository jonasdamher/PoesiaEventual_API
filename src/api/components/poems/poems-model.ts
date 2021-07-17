'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

interface keywords {
    _id: Schema.Types.ObjectId;
    word: string;
}

export interface Poem extends Document {
    author: Schema.Types.ObjectId;
    title: string;
    text: string;
    url: string;
    description: string;
    keywords: Array<keywords>;
    created_at: number;
    update_at: number;
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
        trim:true,
        required: [true, 'Es obligatorio introducir un título del poema.'],
    },
    text: {
        type: String,
        trim:true,
        required: [true, 'Es obligatorio introducir un cuerpo del poema.'],
    },
    meta: {
        url: {
            type: String,
            trim:true,
            validate: {
                validator: function (v: any) {
                    return regex.url_name.test(v);
                },
                message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir un nombre de url.'],
            unique: [true, 'La url introducida ya existe.']
        },
        description: {
            type: String,
            min: 70,
            maxLength: 155,
            trim:true,
            required: [true, 'Es obligatorio introducir una descripción.'],
        },
        keywords: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
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
        default: moment().unix()
    },
    update_at: {
        type: Number,
        default: 0
    }
})

export default model('poems', poem_schema);