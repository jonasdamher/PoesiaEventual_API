'use strict';

import moment from 'moment';
import mongoose, { model, Document, Schema, Error } from 'mongoose';
import * as regex from '../../utils/regex';
import Text from '../../helpers/Text';
import { array_filter } from '../../utils/filter';
import { get_pagination, paginate } from '../../utils/pagination';

import RECOG from '../recognitions/recognitions-model';
import POEM from '../poems/poems-model';
import BOOK from '../books/books-model';
import Pagination from '../../types/Pagination';

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

interface DocAuthor extends Document {
    saveAuthor(): Promise<Author>;
    updateAuthor(data: Partial<Author>): Promise<Author | null | Error>;
    deleteAuthor(): Promise<any>;
    getDataAuthor(url: string): Promise<any>;
    all_authors(page: number, perPage: number): Promise<any>;
}

export interface Author extends DocAuthor {
    name: string;
    lastname: string;
    full_name: string;
    pseudonym: string;
    gender?: genders;
    country: Schema.Types.ObjectId;
    occupations: Array<Schema.Types.ObjectId>;
    literary_genres: Array<Schema.Types.ObjectId>;
    short_description: string;
    biography: string;
    portrait: string;
    photos: Array<photos>;
    url?: string;
    description: string;
    keywords: Array<keywords>;
    createdAt: number;
    updatedAt: number;
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
        maxLength: 2000,
        validate: {
            validator: (v: any) => {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un texto.'],
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
    return new Promise((resolve, reject) => {

        this.full_name = this.name.trim() + ' ' + this.lastname.trim();
        this.url = Text.url(this.full_name);

        this.save().then((authorResponse: Author) => {

            resolve(authorResponse);

        }).catch((err: any) => {

            reject(err);
        });

    });
};

author_schema.methods.updateAuthor = async function (data: Partial<Author>): Promise<Author | null | Error> {
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

        if (data.literary_genres) {
            const other_literary_genres = array_filter(this.literary_genres, data.literary_genres);
            data.literary_genres = data.literary_genres.concat(other_literary_genres);
        }
        if (data.occupations) {
            const other_occupations = array_filter(this.occupations, data.occupations);
            data.occupations = data.occupations.concat(other_occupations);
        }
        if (data.photos) {
            const other_photos = array_filter(this.photos, data.photos, '_id');
            data.photos = data.photos.concat(other_photos);
        }
        if (data.keywords) {
            const other_keywords = array_filter(this.keywords, data.keywords, '_id');
            data.keywords = data.keywords.concat(other_keywords);
        }

        AUTHOR.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        ).then((authorResponse: Author | null) => {

            resolve(authorResponse);
        }).catch((err: Error) => {

            reject(err);
        });

    });
};

author_schema.methods.all_authors = async function (page: number, perPage: number) {
    return new Promise((resolve, reject) => {

        get_pagination(AUTHOR, page, perPage).then((pagination: Pagination) => {

            AUTHOR.aggregate([
                {
                    $sort: {
                        full_name: 1,
                    },
                },
                {
                    $lookup: {
                        from: 'occupations',
                        localField: 'occupations',
                        foreignField: '_id',
                        as: 'occupations',
                    },
                },
                {
                    $lookup: {
                        from: 'literary_genres',
                        localField: 'literary_genres',
                        foreignField: '_id',
                        as: 'literary_genres',
                    },
                },
                {
                    $lookup: {
                        from: 'books',
                        localField: '_id',
                        foreignField: 'author',
                        as: 'books',
                    },
                },
                {
                    $addFields: {
                        total_books: { $size: '$books' },
                    },
                },
                {
                    $lookup: {
                        from: 'poems',
                        localField: '_id',
                        foreignField: 'author',
                        as: 'poems',
                    },
                },
                {
                    $addFields: {
                        total_poems: { $size: '$poems' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        full_name: 1,
                        short_description: 1,
                        url: 1,
                        portrait: 1,
                        total_books: 1,
                        total_poems: 1,
                        occupations: '$occupations.name',
                        literary_genres: '$literary_genres.name',
                    },
                },
                { $skip: pagination.page_range },
                { $limit: pagination.perPage },
            ]).exec().then((authorResponse: Author[] | null) => {

                const result = {
                    authors: authorResponse,
                    pagination: paginate(pagination)
                };
                resolve(result);

            }).catch((err: any) => {

                reject(err);
            });

        }).catch((err: any) => {

            reject(err);
        });
    });
};

author_schema.methods.deleteAuthor = async function (this: Author) {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const del: Author | null = await AUTHOR.findByIdAndDelete(this._id);
        // borrar el registro asociado a del autor 
        await RECOG.deleteMany({ author: this._id });
        await BOOK.deleteMany({ author: this._id });
        await POEM.deleteMany({ author: this._id });

        await session.commitTransaction();

        return del;

    } catch (error: any) {
        await session.abortTransaction();
        return error;
    } finally {
        // Finaliza la sesión
        session.endSession();
    }
};

author_schema.methods.getDataAuthor = async function (url: string) {
    try {

        const data = await AUTHOR.aggregate([
            {
                $match: {
                    url: url,
                },
            },
            {
                $lookup: {
                    from: 'countries',
                    localField: 'country',
                    foreignField: '_id',
                    as: 'country',
                },
            },
            {
                $lookup: {
                    from: 'occupations',
                    localField: 'occupations',
                    foreignField: '_id',
                    as: 'occupations',
                },
            },
            {
                $lookup: {
                    from: 'literary_genres',
                    localField: 'literary_genres',
                    foreignField: '_id',
                    as: 'literary_genres',
                },
            },
            {
                $lookup: {
                    from: 'poems',
                    localField: '_id',
                    foreignField: 'author',
                    as: 'poems',
                },
            },
            {
                $lookup: {
                    from: 'recognitions',
                    localField: '_id',
                    foreignField: 'author',
                    as: 'recognitions',
                },
            },
            {
                $lookup: {
                    from: 'books',
                    let: { authorId: '$_id' },
                    pipeline: [
                        {
                            $sort: {
                                published: 1,
                            },
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$author', '$$authorId'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'editorials',
                                localField: 'editorial',
                                foreignField: '_id',
                                as: 'editorial',
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                title: '$title',
                                synopsis: '$synopsis',
                                published: '$published',
                                editorial: { $arrayElemAt: ['$editorial.name', 0] },
                            },
                        },
                    ],
                    as: 'books'
                }
            },
            {
                $project: {
                    _id: 0,
                    full_name: 1,
                    short_description: 1,
                    biography: 1,
                    url: 1,
                    portrait: 1,
                    books: 1,
                    poems: { $map: { input: '$poems', as: 'poems', in: { title: '$$poems.title', text: '$$poems.text' } } },
                    recognitions: { $map: { input: '$recognitions', as: 'recognitions', in: { title: '$$recognitions.title', text: '$$recognitions.text', age: '$$recognitions.age' } } },
                    occupations: '$occupations.name',
                    literary_genres: '$literary_genres.name',
                    country: { $arrayElemAt: ['$country.name', 0] }
                },
            },
        ]).exec();

        return data;

    } catch (error: any) {
        return error;
    }
};

const AUTHOR = model<Author>('authors', author_schema);
export default AUTHOR;