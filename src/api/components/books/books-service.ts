'use strict';

import BOOK, { Book } from './books-model';
// Ayudantes
import { logger_books } from '../../helpers/logger';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export {
    get_all,
    get_by_id,
    get_books_of_author,
    search,
    create
}

function get_all(page: number, perpage: number): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        let current_page = Math.max(0, page)
        let pageNum = current_page
        --current_page

        BOOK.find().countDocuments().then((count: any) => {

            const limit = Math.ceil(count / perpage)

            BOOK.find()
                .skip(perpage * current_page)
                .limit(perpage)
                .sort('title')
                .select('title')
                .populate({ path: 'author', select: 'personal.full_name meta.url' })
                .populate({ path: 'editorial', select: 'name' })
                .populate({ path: 'literary_genre', select: 'name' })
                .then((book_list: any) => {

                    let data = {
                        books: book_list,
                        pagination: {
                            perPage: perpage,
                            page: pageNum,
                            lastPage: limit,
                            total: count
                        }
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

function get_by_id(id: string): Promise<Response_data> {
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

function get_books_of_author(id: any) {
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

function search(page: number, perpage: number, search: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        let current_page = Math.max(0, page)
        let pageNum = current_page
        --current_page

        BOOK.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(count => {

            const limit = Math.ceil(count / perpage)

            BOOK.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } })
                .skip(perpage * current_page)
                .limit(perpage)
                .sort('title')
                .populate('author editorial literary_genre')
                .then((poems: any) => {

                    let data = {
                        poems: poems,
                        pagination: { perPage: perpage, page: pageNum, lastPage: limit, total: count }
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

function create(data: any): Promise<Response_data> {
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
