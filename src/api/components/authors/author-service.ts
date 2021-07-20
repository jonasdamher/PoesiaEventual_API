'use strict';

// Modelos
import AUTHOR, { Author } from './author-model';
// Otros servicios
import BooksService from '../books/books-service';
import PoemsService from '../poems/poems-service';
import RecogService from '../recognitions/recognitions-service';
// Ayudantes
import Text from '../../helpers/Text';
import response_data from '../../utils/response_data';
import { logger_authors } from '../../helpers/logger';
import ResponseHandler from '../../helpers/ResponseHandler';
import { get_pagination, paginate } from '../../utils/pagination';
// Tipos
import Response_data from '../../types/Response_data';

export default class AuthorService extends ResponseHandler {

    get_all_authors(page: number, perpage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            get_pagination(AUTHOR, page, perpage).then((pagination: any) => {

                AUTHOR.find().skip(pagination.page_range).limit(pagination.perpage)
                    .sort('personal.full_name')
                    .select('personal.full_name short_description portrait meta.url')
                    .populate({ path: 'professional.occupations', select: 'name' })
                    .populate({ path: 'professional.literary_genres', select: 'name' })
                    .then((authorResponse: any) => {

                        let result = {
                            authors: authorResponse,
                            pagination: paginate(pagination)
                        };

                        this.result(result);
                        resolve(this.response());
                    }).catch((err: any) => {

                        this.status(400).message('BadRequest').result(err);
                        logger_authors.info({ ...this.response() }, 'service');
                        reject(this.response());
                    });

            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                logger_authors.info({ ...this.response() }, 'service');
                reject(this.response());
            });
        });
    }

    get_author_by_name(name: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            AUTHOR.findOne({ 'meta.url': name })
                .select('personal.full_name biography photos meta.url meta.description meta.keywords')
                .populate({ path: 'professional.occupations', select: 'name' })
                .populate({ path: 'professional.literary_genres', select: 'name' })
                .populate({ path: 'personal.country', select: 'name' })
                .then(async (current_author: any) => {

                    let recog = new RecogService();
                    let poems = new PoemsService();
                    let books = new BooksService();

                    let result = {
                        author: current_author,
                        books: await books.get_books_of_author(current_author._id),
                        poems: await poems.get_poems_of_author(current_author._id),
                        recognitions: await recog.get_recognitions_of_author(current_author._id)
                    };

                    this.result(result);
                    resolve(this.response())
                }).catch((err: any) => {

                    this.status(400).message('BadRequest').result(err);
                    logger_authors.info({ ...this.response() }, 'service');
                    reject(this.response());
                })
        });
    }

    get_author_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            AUTHOR.findById(id).then((authorResponse: any) => {

                this.result(authorResponse);
                resolve(this.response())
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                logger_authors.info({ ...this.response() }, 'service');
                reject(this.response());
            })
        });
    }

    search_author(page: number, perpage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const query = { 'personal.full_name': { $regex: '.*' + search + '.*', $options: 'i' } };

            get_pagination(AUTHOR, page, perpage, query).then((pagination: any) => {

                AUTHOR.find(query)
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('personal.full_name')
                    .select('personal.full_name short_description portrait meta.url')
                    .then((authorResponse: any) => {

                        let result = {
                            authors: authorResponse,
                            pagination: paginate(pagination)
                        };

                        this.result(result);
                        resolve(this.response());
                    }).catch((err: any) => {

                        this.status(400).message('BadRequest').result(err);
                        logger_authors.info({ ...this.response() }, 'service');
                        reject(this.response());
                    });

            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                logger_authors.info({ ...this.response() }, 'service');
                reject(this.response());
            });
        });
    }

    random_author(): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            AUTHOR.find().countDocuments().then((count: any) => {

                const random = Math.floor(Math.random() * count);

                AUTHOR.findOne().skip(random).then((author: any) => {

                    this.result(author);
                    resolve(this.response());
                }).catch((err: any) => {

                    this.status(400).message('BadRequest').result(err);
                    logger_authors.info({ ...this.response() }, 'service');
                    reject(this.response());
                })

            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                logger_authors.info({ ...this.response() }, 'service');
                reject(this.response());
            })
        })
    }

    create_author(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            data.personal.full_name = data.personal.name.trim() + ' ' + data.personal.lastname.trim();
            data.meta.url = Text.url(data.personal.full_name);

            const author: Author = new AUTHOR(data);

            author.save().then((authorResponse: Author) => {

                this.status(201).message('Created').result(authorResponse);
                resolve(this.response())
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                logger_authors.info({ ...this.response() }, 'service');
                reject(this.response());
            })
        });
    }

    update_author(id: any, data: any): Promise<Response_data> {
        return new Promise(async (resolve, reject) => {

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

                this.result(authorResponse);
                resolve(this.response())
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                logger_authors.info({ ...this.response() }, 'service');
                reject(this.response());
            })
        });
    }
}