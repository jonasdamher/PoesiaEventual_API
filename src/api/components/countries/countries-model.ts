'use strict';

import { Model, model, Document, Schema } from 'mongoose';

export interface Country extends Document {
    name: string;
    language: string;
    ISO: string;
}

// Para añadir funciones extras con mongoose
interface countries_model extends Model<Country> { }

const countries_schema: Schema<Country, countries_model> = new Schema({
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
})

export default model<Country, countries_model> ('countries', countries_schema);