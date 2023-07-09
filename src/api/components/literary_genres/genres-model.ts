'use strict';

import moment from 'moment';
import { model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

interface subgenres {
    _id: Schema.Types.ObjectId;
    name: string;
}

export interface Genre extends Document {
    name: string;
    description: string;
    subgenres: Array<subgenres>;
    createdAt: number;
    updatedAt: number;
}

const genres_schema = new Schema<Genre>({
    name: {
        type: String,
        maxLength: 40,
        validate: {
            validator: function (v: any) {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
        unique: [true, 'El nombre introducido ya existe.']
    },
    description: {
        type: String,
        maxLength: 250,
    },
    subgenres: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
            name: {
                type: String,
                maxLength: 40,
                validate: {
                    validator: function (v: any) {
                        return regex.text_only.test(v);
                    },
                    message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
                },
                required: [true, 'Es obligatorio introducir un nombre.'],
            }
        },
    ],
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
})

export default model<Genre>('literary_genres', genres_schema)