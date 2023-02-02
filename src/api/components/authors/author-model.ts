'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';

enum genders {
    'Hombre', 'Mujer', 'No binario'
}

interface photos {
    _id: Schema.Types.ObjectId;
    order: number;
    alt: string;
    desc: string;
    photo: string;
}

interface keywords {
    _id: Schema.Types.ObjectId;
    word: string;
}

export interface Author extends Document {
    name: string;
    lastname: string;
    full_name: string;
    pseudonym: string;
    gender: genders;/*
    occupations: Schema.Types.ObjectId;
    literary_genres: Schema.Types.ObjectId;
    country: Schema.Types.ObjectId;*/
    short_description: string;/*
    biography: string;
    portrait: string;
    photos: Array<photos>;
    url: string;
    description: string;
    keywords: Array<keywords>;*/
    created_at: number;
    update_at: number;
}

// Para añadir funciones extras con mongoose
interface author_model extends Model<Author> { }

const author_schema = new Schema<Author, author_model>({
    personal: {
        name: {
            type: String,
            validate: {
                validator: (v: any) => {
                    return regex.text_only.test(v);
                },
                message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir un nombre.'],
        },
        lastname: {
            type: String,
            validate: {
                validator: (v: any) => {
                    return regex.text_only.test(v);
                },
                message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir los apellidos.'],
        },
        full_name: {
            type: String
        },
        pseudonym: {
            type: String,
            validate: {
                validator: (v: any) => {
                    return regex.text_only.test(v);
                },
                message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
            },
        },
        gender: {
            type: String,
            enum: ['Hombre', 'Mujer', 'No binario'],
            required: true
        },/*
        country: {
            type: Schema.Types.ObjectId,
            ref: 'countries'
        }*/
    },/*
    professional: {
        occupations: [{
            type: Schema.Types.ObjectId,
            ref: 'occupations'
        }],
        literary_genres: [{
            type: Schema.Types.ObjectId,
            ref: 'literary_genres'
        }],
    },*/
    short_description: {
        type: String,
        maxLength: 155,
        required: [true, 'Es obligatorio introducir una descripción corta.'],
    },/*
    biography: {
        type: String,
        maxLength: 700,
        validate: {
            validator: (v: any) => {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un trext.'],
    },
    portrait: {
        type: String,
        validator: (v: any) => {
            return regex.photo.test(v);
        },
        required: true
    },
    photos: {
        type: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    index: true,
                    required: true,
                    auto: true
                },
                order: Number,
                alt: String,
                desc: String,
                photo: {
                    type: String,
                    validator: (v: any) => {
                        return regex.photo.test(v);
                    },
                    message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
                }
            }
        ],
        validate: {
            validator: (v: any) => {
                return v.length <= 4;
            },
            message: (props: any) => `(${props.value}) máx 4 imagenes.`
        }
    },
    meta: {
        url: {
            type: String,
            validate: {
                validator: (v: any) => {
                    return regex.url_name.test(v);
                },
                message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir un nombre de url.'],
            unique: [true, 'La url introducida ya existe.']
        },
        description: {
            type: String,
            minLength: 70,
            maxLength: 155,
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
    },*/
    created_at: {
        type: Number,
        default: moment().unix()
    },
    update_at: {
        type: Number,
        default: 0
    }
}).index({ 'personal.name': 'text', 'personal.lastname': 'text' });

export default model<Author, author_model>('authors', author_schema)