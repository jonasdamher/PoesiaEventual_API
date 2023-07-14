'use strict';

// Modelos
import AUTHOR, { Author } from './author-model';
// Ayudantes 
import response_data from '../../utils/response_data';
import { logger_authors } from '../../helpers/logger';
import { get_pagination, paginate } from '../../utils/pagination';
// Tipos
import Response_data from '../../types/Response_data';

export default class AuthorService {

    protected get_all_authors(page: number, perPage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            get_pagination(AUTHOR, page, perPage).then((pagination: any) => {

                AUTHOR.find().skip(pagination.page_range).limit(pagination.perPage)
                    .sort('name')
                    .select('name lastname short_description portrait url')
                    .populate({ path: 'occupations', select: 'name' })
                    .populate({ path: 'literary_genres', select: 'name' })
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
                        logger_authors.info({ ...response }, 'service');
                        reject(response);
                    });

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            });
        });
    }

    protected get_author_by_name(name: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            AUTHOR.findOne({ $text: { $search: name } })
                .select('name ').
                populate({ path: 'occupations', select: 'name' })
                .populate({ path: 'literary_genres', select: 'name' })
                .populate({ path: 'country', select: 'name' })
                .then(async (current_author: any) => {

                    const data_author = await current_author.getDataAuthor(current_author._id);

                    response.result = {
                        author: current_author,
                        ...data_author
                    };

                    resolve(response);
                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    logger_authors.info({ ...response }, 'service');
                    reject(response);
                });
        });
    }

    protected get_author_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            AUTHOR.findById(id).then((authorResponse: any) => {

                response.result = authorResponse;
                resolve(response);
            }).catch((err: any) => {

                response.status = 404;
                response.message = 'Not found';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            });
        });
    }

    protected search_author(page: number, perPage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();
            const query = { $text: { $search: search } };

            get_pagination(AUTHOR, page, perPage, query).then((pagination: any) => {
                AUTHOR.find(query).skip(pagination.page_range).limit(pagination.perPage).sort('lastname').select('name lastname short_description').then((authorResponse: any) => {

                    response.result = {
                        authors: authorResponse,
                        pagination: paginate(pagination)
                    };
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    logger_authors.info({ ...response }, 'service');
                    reject(response);
                });

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            });
        });
    }

    protected random_author(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            AUTHOR.find().countDocuments().then((count: any) => {

                const random = Math.floor(Math.random() * count);

                AUTHOR.findOne().skip(random).then((author: any) => {

                    response.result = author;
                    resolve(response);
                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    logger_authors.info({ ...response }, 'service');
                    reject(response);
                });

            }).catch((err: any) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            });
        });
    }

    protected create_author(data: Author): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            const author: Author = new AUTHOR(data);

            author.saveAuthor().then((authorResponse: any) => {

                response.status = 201;
                response.message = 'Created';
                response.result = authorResponse;
                resolve(response);
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            });
        });
    }

    protected update_author(id: any, data: Partial<Author>): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            AUTHOR.findById(id).then((current_user: any) => {

                current_user.updateAuthor(data).then((authorResponse: Author) => {

                    response.result = authorResponse;
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    logger_authors.info({ ...response, id: id, data: data }, 'service');
                    reject(response);
                });

            }).catch((err: any) => {

                response.status = 404;
                response.message = 'not found';
                response.result = err;
                logger_authors.info({ ...response, id: id, data: data }, 'service');
                reject(response);
            });

        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();
            const author: Author = new AUTHOR({ _id: id });

            author.deleteAuthor().then((result: any) => {
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