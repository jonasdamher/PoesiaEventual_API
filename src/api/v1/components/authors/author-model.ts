'use strict';

import { Model, model, Document, Schema } from 'mongoose';

export interface Author extends Document {
    name: string;
}

// Para añadir funciones extras con mongoose
interface author_model extends Model<Author> { }

const author_schema: Schema<Author, author_model> = new Schema({
    name: {
        type: String,
        min: 2,
        validate: {
            validator: function (v:any) {
                return /[^0-9]/.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
        unique: [true, 'El nombre introducido ya existe.']
    }
})

export default model('authors', author_schema)