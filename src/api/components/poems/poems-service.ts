'use strict';

import POEM, { Poem } from './poems-model';
// Ayudantes
import { logger_poems } from '../../helpers/logger';
import Text from '../../helpers/Text';
import { get_pagination, paginate } from '../../utils/pagination';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export default class PoemsService {

    protected get_all_poems(page: number, perpage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            get_pagination(POEM, page, perpage).then((pagination: any) => {

                POEM.find().populate('author', 'name lastname').skip(pagination.page_range).limit(pagination.perpage).sort('title')

                    .then((authorResponse: any) => {

                        response.result = {
                            authors: authorResponse,
                            pagination: paginate(pagination)
                        };
                        resolve(response);

                    }).catch((err: any) => {

                        response.status = 400;
                        response.message = 'BadRequest';
                        response.result = err;
                        reject(response);
                    });
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err; reject(response);
            });
        });
    }

    public get_poems_of_author(id: any) {
        return new Promise((resolve, reject) => {

            const current_id: Schema.Types.ObjectId = id;

            POEM.findOne({ author: current_id }).select('title text').then((poems: any) => {
                if (!poems) resolve([]);
                if (poems.length > 1) resolve(poems);
                resolve([poems]);
            }).catch((err: any) => {
                logger_poems.info(err, 'service');
                reject([]);
            })
        })
    }

    protected get_all_poems_of_author_by_id(page: number, perpage: number, id: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();
            const current_id: Schema.Types.ObjectId = id;
            let query = { author: current_id };

            get_pagination(POEM, page, perpage, query).then((pagination: any) => {

                POEM.find(query).populate('author', 'name lastname').skip(pagination.page_range).limit(pagination.perpage).sort('title')
                    .then(poemList => {

                        response.result = {
                            poems: poemList,
                            pagination: paginate(pagination)
                        }
                        resolve(response);

                    }).catch((err: any) => {

                        response.status = 400;
                        response.message = 'BadRequest';
                        response.result = err;
                        reject(response);
                    })
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            })
        });
    }

    protected get_poem_by_id_(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            POEM.findById({ _id: id }).populate('author', 'name lastname').then((poem: any) => {

                response.result = poem;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            })
        })
    }

    protected search_poem(page: number, perpage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            let query = { $text: { $search: search } };

            get_pagination(POEM, page, perpage, query)
                .then((pagination: any) => {

                    POEM.find(query).populate('author', 'name lastname').skip(pagination.page_range).limit(pagination.perpage).sort('title')
                        .then((poems: any) => {

                            response.result = {
                                poems: poems,
                                pagination: paginate(pagination)
                            }
                            resolve(response);

                        }).catch((err: any) => {

                            response.status = 400;
                            response.message = 'BadRequest';
                            response.result = err;
                            reject(response);
                        })

                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    reject(response);
                })
        })
    }

    protected random_poem(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            POEM.find().countDocuments().then(count => {

                const random = count == 1 ? 1 : Math.floor(Math.random() * count)

                POEM.findOne().populate('author', 'name lastname').skip(random).then((poem: any) => {

                    response.result = poem;
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    reject(response);
                })

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            })
        })
    }

    protected create_poem(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            data.url = Text.url(data.title);

            // si es un array de poemas
            if (data.poems) {
                let results: any = [];

                data.poems.forEach((current_poem: any) => {

                    const current_data = {
                        title: current_poem.title,
                        text: current_poem.text,
                        author: data.author
                    };

                    const poem: Poem = new POEM(current_data);
                    poem.save().then((new_poem: Poem) => {

                        results.push(new_poem);
                    }).catch((err: any) => {

                        response.status = 400;
                        response.message = 'BadRequest multiply';
                        response.result = err;
                        reject(response);
                    })

                });

                response.status = 201;
                response.message = 'Created';
                response.result = results;
                resolve(response);

            } else { // si es un unico poema
                const poem: Poem = new POEM(data);

                poem.save().then((new_poem: Poem) => {

                    response.status = 201;
                    response.message = 'Created';
                    response.result = new_poem;
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest only';
                    response.result = err;
                    reject(response);
                })
            }
        })
    }

    protected update_poem(id: any, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            if (data.title && data.title.length) {
                data.url = Text.url(data.title);
            }

            POEM.findById(id).then((poem: any) => {

                if (data.keywords && Array.isArray(data.keywords) && data.keywords.length) {

                    poem.keywords.forEach((word: any) => {

                        // Filtrar libros existentes para actualizar
                        const existing = data.keywords.findIndex((exists: any) => exists._id === word._id.toString());

                        if (existing === -1) {
                            data.keywords.push(word);
                        }

                    });
                }

                POEM.findByIdAndUpdate(
                    id,
                    { $set: data },
                    { new: true }
                ).then((update: any) => {

                    response.result = update;
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest only';
                    response.result = err;
                    reject(response);
                })

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest only';
                response.result = err;
                reject(response);
            })

        })
    }

}