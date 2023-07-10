'use strict';

import moment from 'moment';
import { model, Document, Schema } from 'mongoose';
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

export interface Author extends Document {
    name: string;
    lastname: string;
    full_name: string;
    pseudonym: string;
    gender: genders;
    country: Schema.Types.ObjectId;
    occupations: Array<Schema.Types.ObjectId>;
    literary_genres: Array<Schema.Types.ObjectId>;
    short_description: string;
    biography: string;
    portrait: string;
    photos: Array<photos>;
    url: string;
    description: string;
    keywords: Array<keywords>;
    createdAt: number;
    updateAt: number;

    saveAuthor(): Promise<Author>;
    updateAuthor(data: Partial<Author>): Promise<Author>;
}

const author_schema = new Schema<Author>({
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
    },
    occupations: [{
        type: Schema.Types.ObjectId,
        ref: 'occupations'
    }],
    literary_genres: [{
        type: Schema.Types.ObjectId,
        ref: 'literary_genres'
    }],
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
    keywords: {
        type: [{
            _id: {
                type: Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true
            },
            word: String
        }],
        validate: {
            validator: (v: any) => {
                return v.length <= 25;
            },
            message: 'El número máximo de palabras clave son 25.'
        }
    },
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
}).index({ 'name': 'text', 'lastname': 'text' });

author_schema.methods.saveAuthor = async function (this: Author) {
    return new Promise(async (resolve, reject) => {

        this.full_name = this.name.trim() + ' ' + this.lastname.trim();
        this.url = Text.url(this.full_name);

        this.save().then((authorResponse: Author) => {

            resolve(authorResponse);

        }).catch((err: any) => {

            reject(err);
        })

    });
}

author_schema.methods.updateAuthor = async function (data: Author) {
    return new Promise((resolve, reject) => {

        const id = this._id;

        if (data.name && data.lastname) {

            data.full_name = data.name.trim() + ' ' + data.lastname.trim();
            data.url = Text.url(data.full_name);

        } else {

            if (data.name) {

                data.full_name = data.name.trim() + ' ' + this.lastname;
                data.url = Text.url(data.full_name);
            }

            if (data.lastname) {

                data.full_name = this.name.trim() + ' ' + data.lastname;
                data.url = Text.url(data.full_name);
            }
        }

        if (data.literary_genres && Array.isArray(data.literary_genres) && data.literary_genres.length) {

            this.literary_genres.forEach((word: any) => {

                // Filtrar libros existentes para actualizar
                const existing = data.literary_genres.findIndex((exists: any) => exists === word.toString());

                if (existing === -1) {
                    data.literary_genres.push(word);
                }

            });
        }

        if (data.occupations && Array.isArray(data.occupations) && data.occupations.length) {

            this.occupations.forEach((word: any) => {

                // Filtrar libros existentes para actualizar
                const existing = data.occupations.findIndex((exists: any) => exists === word.toString());

                if (existing === -1) {
                    data.occupations.push(word);
                }

            });
        }

        if (data.photos && Array.isArray(data.photos) && data.photos.length) {

            this.photos.forEach((photography: any) => {

                // Filtrar libros existentes para actualizar
                const existing = data.photos.findIndex((exists: any) => exists._id === photography._id.toString());

                if (existing === -1) {
                    data.photos.push(photography);
                }

            });
        }

        if (data.keywords && Array.isArray(data.keywords) && data.keywords.length) {

            this.keywords.forEach((word: any) => {

                // Filtrar libros existentes para actualizar
                const existing = data.keywords.findIndex((exists: any) => exists._id === word._id.toString());

                if (existing === -1) {
                    data.keywords.push(word);
                }

            });
        }

        AUTHOR.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        ).then((authorResponse: any) => {

            resolve(authorResponse)
        }).catch((err: any) => {

            reject(err);
        })

    });
}

const AUTHOR = model<Author>('authors', author_schema)
export default AUTHOR;