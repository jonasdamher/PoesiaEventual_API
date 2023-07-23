'use strict';

import BOOK, { Book } from './books-model';
// Ayudantes
import { logger_books } from '../../helpers/logger';
import { get_pagination, paginate } from '../../utils/pagination';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';
import Pagination from '../../types/Pagination';

export default class BooksService {

    protected get_all_books(page: number, perPage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            get_pagination(BOOK, page, perPage).then((pagination: Pagination) => {

                BOOK.find()
                    .skip(pagination.page_range)
                    .limit(pagination.perPage)
                    .sort('title')
                    .select('title')
                    .populate({ path: 'author', select: 'full_name url' })
                    .populate({ path: 'editorial', select: 'name' })
                    .populate({ path: 'literary_genre', select: 'name' })
                    .then((book_list: Book[] | null) => {

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
                .then((book: Book | null) => {

                    response.result = book;
                    resolve(response);
                }).catch((err: any) => {
                    response.status = 400;
                    response.result = err;
                    reject(response);
                });
        });
    }

    protected search_book(page: number, perPage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();
            const query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };

            get_pagination(BOOK, page, perPage, query).then((pagination: Pagination) => {

                BOOK.find(query).skip(pagination.page_range).limit(pagination.perPage).sort('title').populate('author editorial literary_genre').then((books: Book[] | null) => {

                    const data = {
                        books: books,
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

    protected create_book(data: Partial<Book>): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();
            const book: Book = new BOOK(data);

            book.save().then((result: Book) => {

                response.result = result;
                resolve(response);
            }).catch((err: any) => {
                response.status = 400;
                response.result = err;
                logger_books.info(err, 'service');
                reject(response);
            });
        });
    }

    protected update_book(id: string, data: Partial<Book>): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            BOOK.findByIdAndUpdate(id, { $set: data }, { new: true }).then((result: Book | null) => {

                response.result = result;
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

            BOOK.findByIdAndDelete(id).then((result: Book | null) => {
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