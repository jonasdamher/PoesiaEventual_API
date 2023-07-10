'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

export interface Editorial extends Document {
    name: string;
    description: string;
    createdAt: number;
    updatedAt: number;
};

const editorial_schema = new Schema<Editorial>({
    name: {
        type: String,
        maxLength: 40,
        validate: {
            validator: (v: any) => {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.']
    },
    description: {
        type: String,
    },
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
});

export default model<Editorial>('editorials', editorial_schema)
