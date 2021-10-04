'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

interface keywords {
    _id: Schema.Types.ObjectId;
    word: string;
}

export interface Recognition extends Document {
    author: Schema.Types.ObjectId;
    title: string;
    age: number;
    posthumous: boolean;
    text: string;
    url: string;
    description: string;
    keywords: Array<keywords>;
    created_at: number;
    update_at: number;
}

const recognitions_schema: Schema<Recognition> = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'authors'
    },
    title: {
        type: String,
        required: [true, 'Es obligatorio introducir un título del poema.'],
    },
    age: {
        type: Number
    },
    posthumous: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
    },
    meta: {
        url: {
            type: String,
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

const RECOG: Model<Recognition> = model('recognitions', recognitions_schema);
export default RECOG;