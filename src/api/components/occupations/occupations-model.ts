'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

export interface Occupation extends Document {
    name: string;
    description: string;
    created_at: number;
    update_at: number;
}

// Para añadir funciones extras con mongoose
interface occupations_model extends Model<Occupation> { }

const occupations_schema: Schema<Occupation, occupations_model> = new Schema({
    name: {
        type: String,
        validate: {
            validator: function (v: any) {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: true,
        unique: true
    },
    description: {
        type: String
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

export default model<Occupation, occupations_model>('occupations', occupations_schema)