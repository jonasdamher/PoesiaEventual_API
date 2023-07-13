'use strict';

import BOOK, { Book } from './books-model';
// Ayudantes
import { logger_books } from '../../helpers/logger';
import { get_pagination, paginate } from '../../utils/pagination';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export default class BooksService {

    protected get_all_books(page: number, perPage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            get_pagination(BOOK, page, perPage).then((pagination: any) => {

                BOOK.find()
                    .skip(pagination.page_range)
                    .limit(pagination.perPage)
                    .sort('title')
                    .select('title')
                    .populate({ path: 'author', select: 'full_name url' })
                    .populate({ path: 'editorial', select: 'name' })
                    .populate({ path: 'literary_genre', select: 'name' })
                    .then((book_list: any) => {

                        const data = {
                            books: book_list,
                            pagination: paginate(pagination)
                        };

                        response.result = data;
                        resolve(response);

                    }).catch((err: any) => {

                        response.status = 400;
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

    protected get_book_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            BOOK.findById({ _id: id })
                .select('title')
                .populate({ path: 'author', select: 'full_name url' })
                .populate({ path: 'editorial', select: 'name' })
                .populate({ path: 'literary_genre', select: 'name' })
                .then((poem: any) => {

                    response.result = poem;
                    resolve(response);
                }).catch((err: any) => {
                    response.status = 400;
                    response.result = err;
                    reject(response);
                });
        });
    }

    public get_books_of_author(id: any) {
        return new Promise((resolve, reject) => {
            const current_id: Schema.Types.ObjectId = id;

            BOOK.findOne({ author: current_id })
                .select('title url published posthumous')
                .populate({ path: 'editorial', select: 'name' })
                .populate({ path: 'literary_genre', select: 'name' })
                .then((books: any) => {
                    if (!books) {
                        resolve([]);
                    }
                    if (books.length > 1) {
                        resolve(books);
                    }
                    resolve([books]);

                }).catch((err: any) => {
                    logger_books.info(err, 'service');
                    reject([]);
                });
        });
    }

    protected search_book(page: number, perPage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();
            const query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };

            get_pagination(BOOK, page, perPage, query).then((pagination: any) => {

                BOOK.find(query).skip(pagination.page_range).limit(pagination.perPage).sort('title').populate('author editorial literary_genre').then((poems: any) => {

                    const data = {
                        poems: poems,
                        pagination: paginate(pagination)
                    };
                    response.result = data;
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.result = err;
                    reject(response);
                });

            }).catch((err: any) => {

                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }

    protected create_book(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();
            const book: Book = new BOOK(data);

            book.save().then((poem: any) => {

                response.result = poem;
                resolve(response);
            }).catch((err: any) => {
                response.status = 400;
                response.result = err;
                logger_books.info(err, 'service');
                reject(response);
            });
        });
    }

    protected update_book(id: any, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            BOOK.findByIdAndUpdate(id, { $set: data }, { new: true }).then((poem: any) => {

                response.result = poem;
                resolve(response);
            }).catch((err: any) => {
                response.status = 400;
                response.result = err;
                logger_books.info(err, 'service');
                reject(response);
            });
        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            BOOK.findByIdAndDelete(id).then((result: any) => {
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