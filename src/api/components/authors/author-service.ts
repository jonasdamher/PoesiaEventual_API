'use strict';

// Modelos
import AUTHOR, { Author } from './author-model';
// Otros servicios
import BooksService from '../books/books-service';
import PoemsService from '../poems/poems-service';
import RecogService from '../recognitions/recognitions-service';
// Ayudantes 
import response_data from '../../utils/response_data';
import { logger_authors } from '../../helpers/logger';
import { get_pagination, paginate } from '../../utils/pagination';
// Tipos
import Response_data from '../../types/Response_data';

export default class AuthorService {

    get_all_authors(page: number, perpage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            get_pagination(AUTHOR, page, perpage).then((pagination: any) => {
                AUTHOR.find().skip(pagination.page_range).limit(pagination.perpage)
                    .sort('personal.name')
                    .select('personal.name personal.lastname short_description portrait meta.url')
                    .populate({ path: 'professional.occupations', select: 'name' })
                    .populate({ path: 'professional.literary_genres', select: 'name' })
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

    get_author_by_name(name: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            AUTHOR.findOne({ $text: { $search: name } }).select('personal.name ').populate({ path: 'professional.occupations', select: 'name' }).populate({ path: 'professional.literary_genres', select: 'name' }).populate({ path: 'personal.country', select: 'name' }).then(async (current_author: any) => {
                let recog = new RecogService();
                let poems = new PoemsService();
                let books = new BooksService();

                response.result = {
                    author: current_author,
                    books: await books.get_books_of_author(current_author._id),
                    poems: await poems.get_poems_of_author(current_author._id),
                    recognitions: await recog.get_recognitions_of_author(current_author._id)
                };
                resolve(response);
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            })
        });
    }

    get_author_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            AUTHOR.findById(id).then((authorResponse: any) => {

                response.result = authorResponse;
                resolve(response);
            }).catch((err: any) => {

                response.status = 404;
                response.message = 'Not found';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            })
        });
    }

    search_author(page: number, perpage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();
            const query = { $text: { $search: search } };


            get_pagination(AUTHOR, page, perpage, query).then((pagination: any) => {
                AUTHOR.find(query).skip(pagination.page_range).limit(pagination.perpage).sort('personal.lastname').select('personal.name personal.lastname short_description').then((authorResponse: any) => {

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

    random_author(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

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
                })

            }).catch((err: any) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            })
        })
    }

    create_author(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();
            // data.personal.full_name = data.personal.name.trim() + ' ' + data.personal.lastname.trim();
            // data.meta.url = Text.url(data.personal.full_name);
            const author: Author = new AUTHOR(data);

            author.save().then((authorResponse: Author) => {

                response.status = 201;
                response.message = 'Created';
                response.result = authorResponse;
                resolve(response)
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            })
        });
    }

    update_author(id: any, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            // const current_user = await get_by_id(id);

            // if (data.personal.name && data.personal.lastname) {
            //     data.personal.full_name = data.personal.name.trim() + ' ' + data.personal.lastname.trim();
            //     data.meta.url = Text.url(data.personal.full_name);
            // }

            // if (data.personal.name) {
            //     data.personal.full_name = data.personal.name.trim() + ' ' + current_user.data.personal.lastname;
            //     data.meta.url = Text.url(data.personal.full_name);
            // }

            // if (data.personal.lastname) {
            //     data.personal.full_name = current_user.data.personal.name.trim() + ' ' + data.personal.lastname;
            //     data.meta.url = Text.url(data.personal.full_name);
            // }

            AUTHOR.findByIdAndUpdate(id, data).then((authorResponse: any) => {

                response.result = authorResponse;
                resolve(response)
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_authors.info({ ...response }, 'service');
                reject(response);
            })
        });
    }
}