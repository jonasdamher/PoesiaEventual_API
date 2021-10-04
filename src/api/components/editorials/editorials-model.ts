'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

export interface Editorial extends Document {
    name: string;
    description: string;
    created_at: number;
    update_at: number;
};

const editorial_schema: Schema<Editorial> = new Schema({
    name: {
        type: String,
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
    },
    created_at: {
        type: Number,
        default: moment().unix()
    },
    update_at: {
        type: Number,
        default: 0
    }
});

const EDITOR: Model<Editorial> = model('editorials', editorial_schema);
export default EDITOR;