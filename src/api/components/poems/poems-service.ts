'use strict';

import POEM, { Poem } from './poems-model';
// Ayudantes
import { logger_poems } from '../../helpers/logger';
import Text from '../../helpers/Text';
import { get_pagination, paginate } from '../../utils/pagination';
import response_data from '../../utils/response_data';
import { array_filter } from '../../utils/filter';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export default class PoemsService {

    protected get_all_poems(page: number, perPage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            get_pagination(POEM, page, perPage).then((pagination: any) => {

                POEM.find().populate('author', 'name lastname').skip(pagination.page_range).limit(pagination.perPage).sort('title')

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
            });
        });
    }

    protected get_all_poems_of_author_by_id(page: number, perPage: number, id: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();
            const current_id: Schema.Types.ObjectId = id;
            const query = { author: current_id };

            get_pagination(POEM, page, perPage, query).then((pagination: any) => {

                POEM.find(query).populate('author', 'name lastname').skip(pagination.page_range).limit(pagination.perPage).sort('title')
                    .then(poemList => {

                        response.result = {
                            poems: poemList,
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
                response.result = err;
                reject(response);
            });
        });
    }

    protected get_poem_by_id_(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            POEM.findById({ _id: id }).populate('author', 'name lastname').then((poem: any) => {

                response.result = poem;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }

    protected search_poem(page: number, perPage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            const query = { $text: { $search: search } };

            get_pagination(POEM, page, perPage, query)
                .then((pagination: any) => {

                    POEM.find(query).populate('author', 'name lastname').skip(pagination.page_range).limit(pagination.perPage).sort('title')
                        .then((poems: any) => {

                            response.result = {
                                poems: poems,
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
                    response.result = err;
                    reject(response);
                });
        });
    }

    protected random_poem(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            POEM.find().countDocuments().then(count => {

                const random = count == 1 ? 1 : Math.floor(Math.random() * count);

                POEM.findOne().populate('author', 'name lastname').skip(random).then((poem: any) => {

                    response.result = poem;
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
                response.result = err;
                reject(response);
            });
        });
    }

    protected create_poem(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            data.url = Text.url(data.title);

            // si es un array de poemas

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
            });

        });
    }

    protected update_poem(id: any, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            if (data.title && data.title.length) {
                data.url = Text.url(data.title);
            }

            POEM.findById(id).then((poem: any) => {

                const other_keywords = array_filter(poem.keywords, data.keywords, '_id');
                data.keywords = data.keywords.concat(other_keywords);

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
                });

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest only';
                response.result = err;
                reject(response);
            });

        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            POEM.findByIdAndDelete(id).then((result: any) => {
                response.result = result;
                resolve(response);

            }).catch((err: any) => {

                response.status = 404;
                response.message = 'Not found';
                response.result = err;

                reject(response);
            });
        });
    }

}