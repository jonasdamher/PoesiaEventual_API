'use strict';

import { Model, model, Document, Schema } from 'mongoose';

export interface Country extends Document {
    name: string;
    language: string;
    ISO: string;
}

const countries_schema: Schema<Country> = new Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    ISO: {
        type: String,
        default: null
    }
});

const COUNTRIES: Model<Country> = model('countries', countries_schema);
export default COUNTRIES;