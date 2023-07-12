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
    text: string;
    url?: string;
    description: string;
    keywords: Array<keywords>;
    createdAt: number;
    updatedAt: number;
}

const recognitions_schema: Schema<Recognition> = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'authors'
    },
    title: {
        type: String,
        required: [true, 'Es obligatorio introducir un título del reconocimiento.'],
    },
    age: {
        type: Number
    },
    text: {
        type: String,
    },
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
        maxLength: 250,
        required: [true, 'Es obligatorio introducir una descripción.'],
    },
    keywords: {
        type: [{
            _id: {
                type: Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
            word: String
        }],
        validate: {
            validator: (v: any) => {
                return v.length <= 25;
            },
            message: 'El número máximo de palabras clave son 25.'
        }
    },
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
});

const RECOG: Model<Recognition> = model('recognitions', recognitions_schema);
export default RECOG;