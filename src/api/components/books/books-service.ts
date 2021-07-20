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

    get_all_books(page: number, perpage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            get_pagination(BOOK, page, perpage).then((pagination: any) => {

                BOOK.find()
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('title')
                    .select('title')
                    .populate({ path: 'author', select: 'personal.full_name meta.url' })
                    .populate({ path: 'editorial', select: 'name' })
                    .populate({ path: 'literary_genre', select: 'name' })
                    .then((book_list: any) => {

                        let data = {
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
                response.result = err;
                reject(response);
            });
        });
    }

    get_book_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            let response = response_data();

            BOOK.findById({ _id: id })
                .select('title')
                .populate({ path: 'author', select: 'personal.full_name meta.url' })
                .populate({ path: 'editorial', select: 'name' })
                .populate({ path: 'literary_genre', select: 'name' })
                .then((poem: any) => {

                    response.result = poem;
                    resolve(response);
                }).catch((err: any) => {
                    response.status = 400;
                    response.result = err;
                    reject(response)
                })
        })
    }

    get_books_of_author(id: any) {
        return new Promise((resolve, reject) => {
            const current_id: Schema.Types.ObjectId = id;

            BOOK.findOne({ author: current_id })
                .select('title meta.url published posthumous')
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
                    reject([])
                })
        })
    }

    search_book(page: number, perpage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            const query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };

            get_pagination(BOOK, page, perpage, query).then((pagination: any) => {

                BOOK.find(query)
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('title')
                    .populate('author editorial literary_genre')
                    .then((poems: any) => {

                        let data = {
                            poems: poems,
                            pagination: paginate(pagination)
                        }

                        response.result = data;
                        resolve(response)

                    }).catch((err: any) => {

                        response.status = 400;
                        response.result = err;
                        reject(response)
                    })

            }).catch((err: any) => {

                response.status = 400;
                response.result = err;
                reject(response)
            })
        })
    }

    create_book(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            let response = response_data();
            const book: Book = new BOOK(data);

            book.save().then((poem: any) => {

                response.result = poem;
                resolve(response);
            }).catch((err: any) => {
                response.status = 400;
                response.result = err;
                reject(response)
            })
        })
    }
}