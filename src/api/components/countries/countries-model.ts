'use strict';

import { Model, model, Document, Schema } from 'mongoose';

export interface Country extends Document {
    name: string;
    ISO_text: string;
    ISO_number: number;
}

const countries_schema: Schema<Country> = new Schema({
    name: {
        type: String,
        required: true
    },
    ISO_text: {
        type: String,
        required: true
    },
    ISO_number: {
        type: Number,
        default: 0
    }
});

const COUNTRIES: Model<Country> = model('countries', countries_schema);
export default COUNTRIES;