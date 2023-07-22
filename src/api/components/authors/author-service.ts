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
            const author: Author = new AUTHOR();

            author.all_authors(page, perPage).then((result: any) => {

                response.result = result;
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

    protected get_author_by_url(url: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            const author: Author = new AUTHOR();

            author.getDataAuthor(url).then(async (current_author: any) => {

                response.result = current_author[0];

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
                AUTHOR.find(query).skip(pagination.page_range)
                    .limit(pagination.perPage)
                    .sort('lastname')
                    .select('name lastname short_description')
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