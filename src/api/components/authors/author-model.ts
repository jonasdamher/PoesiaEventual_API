'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';
import Text from '../../helpers/Text';

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

interface personal {
    name: string;
    lastname: string;
    full_name: string;
    pseudonym: string;
    gender: genders;
    country: Schema.Types.ObjectId;
}

interface professional {
    occupations: Schema.Types.ObjectId;
    literary_genres: Schema.Types.ObjectId;
}

interface meta {
    url: string;
    description: string;
    keywords: Array<keywords>;
}

interface author_model extends Document {

    saveAuthor(): Promise<author_model>;

}

export interface Author extends author_model {
    personal: personal;
    professional: professional;
    short_description: string;
    biography: string;
    portrait: string;
    photos: Array<photos>;
    meta: meta;
    created_at: number;
    update_at: number;

}

const author_schema = new Schema<Author>({
    personal: {
        name: {
            type: String,
            validate: {
                validator: (v: any) => {
                    return regex.text_only.test(v);
                },
                message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir un nombre.']
        },
        lastname: {
            type: String,
            validate: {
                validator: (v: any) => {
                    return regex.text_only.test(v);
                },
                message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
            },
            required: [true, 'Es obligatorio introducir los apellidos.']
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
            }
        },
        gender: {
            type: String,
            enum: ['Hombre', 'Mujer', 'No binario'],
            required: true
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'countries'
        }
    },
    professional: {
        occupations: [{
            type: Schema.Types.ObjectId,
            ref: 'occupations'
        }],
        literary_genres: [{
            type: Schema.Types.ObjectId,
            ref: 'literary_genres'
        }],
    },
    short_description: {
        type: String,
        maxLength: 300,
        required: [true, 'Es obligatorio introducir una descripción corta.']
    },
    biography: {
        type: String,
        maxLength: 1200,
        validate: {
            validator: (v: any) => {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        // required: [true, 'Es obligatorio introducir un texto.'],
    },
    portrait: {
        type: String,
        validator: (v: any) => {
            return regex.photo.test(v);
        },
        // required: true
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
            maxLength: 250,
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
    },
    created_at: {
        type: Number,
        default: moment().unix()
    },
    update_at: {
        type: Number,
        default: 0
    }
}).index({ 'personal.name': 'text', 'personal.lastname': 'text' });

author_schema.methods.saveAuthor = async function (this: Author) {
    return new Promise(async (resolve, reject) => {

        this.personal.full_name = this.personal.name.trim() + ' ' + this.personal.lastname.trim();
        this.meta.url = Text.url(this.personal.full_name);

        this.save().then((authorResponse: Author) => {

            resolve(authorResponse);

        }).catch((err: any) => {

            reject(err);
        })

    });
}

export default model<Author>('authors', author_schema)