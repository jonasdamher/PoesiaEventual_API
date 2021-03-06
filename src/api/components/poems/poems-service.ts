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

                POEM.find().skip(pagination.page_range).limit(pagination.perpage).sort('title')
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

                POEM.find(query).populate('author', 'personal.name personal.lastname').skip(pagination.page_range).limit(pagination.perpage).sort('title')
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

            POEM.findById({ _id: id }).populate('author','personal.name personal.lastname').then((poem: any) => {

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

                    POEM.find(query).populate('author','personal.name personal.lastname').skip(pagination.page_range).limit(pagination.perpage).sort('title')
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

                POEM.findOne().populate('author', 'personal.name personal.lastname').skip(random).then((poem: any) => {

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

            // data.meta.url = Text.url(data.title);
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

            } else {
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
}