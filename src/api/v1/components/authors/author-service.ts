'use strict';

// Modelos
import AUTHOR, { Author } from './author-model';
import POEM from '../poems/poem-model';
// Ayudantes
import response_data from '../../helpers/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export {
    getAll,
    getWithId,
    searchAuthor,
    random,
    getPoemsList
}


function getAll(page: number, perpage: number): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        let current_page = Math.max(0, page)
        let pageNum = current_page
        --current_page

        AUTHOR.find().countDocuments().then((count: any) => {

                const limit = Math.ceil(count / perpage)

                AUTHOR.find()
                    .skip(perpage * current_page)
                    .limit(perpage)
                    .sort('name')
                    .then((authorResponse: any) => {

                        let data = {
                            authors: authorResponse,
                            pagination: {
                                perPage: perpage,
                                page: pageNum,
                                lastPage: limit,
                                total: count
                            }
                        };

                        response.data = data;
                        response.is_valid = true;
                        resolve(response);

                    }).catch((err: any) => {

                        response.status = 400;
                        response.data = err;
                        reject(response);
                    });

            }).catch((err: any) => {

                response.status = 400;
                response.data = err;
                reject(response);
            });
    });
}

function getWithId(id: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        AUTHOR.findById(id).then((authorResponse: any) => {

            response.data = authorResponse;
            response.is_valid = true;
            resolve(response)
        }).catch((err: any) => {

            response.status = 400;
            response.data = err;
            reject(response);
        })
    });
}

function searchAuthor(page: number, perpage: number, search: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        let current_page = Math.max(0, page)
        let pageNum = current_page
        --current_page

        AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } })
            .countDocuments().then((count: any) => {

                const limit = Math.ceil(count / perpage)

                AUTHOR.find({ name: { $regex: '.*' + search + '.*', $options: 'i' } })
                    .skip(perpage * current_page)
                    .limit(perpage)
                    .sort('name')
                    .then((authorResponse: any) => {

                        let data = {
                            authors: authorResponse,
                            pagination: {
                                perPage: perpage,
                                page: pageNum,
                                lastPage: limit,
                                total: count
                            }
                        };

                        response.data = data;
                        response.is_valid = true;
                        resolve(response);

                    }).catch((err: any) => {

                        response.status = 400;
                        response.data = err;
                        reject(response);
                    });

            }).catch((err: any) => {

                response.status = 400;
                response.data = err;
                reject(response);
            });
    });
}

function random(): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        AUTHOR.find().countDocuments().then((count: any) => {

            const random = Math.floor(Math.random() * count);

            AUTHOR.findOne().skip(random).then((author: any) => {

                response.is_valid = true;
                response.data = author;
                resolve(response);
            }).catch((err: any) => {

                response.status = 400;
                response.data = err;
                reject(response);
            })

        }).catch((err: any) => {

            response.status = 400;
            response.data = err;
            reject(response);
        })
    })
}

function getPoemsList(page: number, perpage: number, id: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        const current_id: Schema.Types.ObjectId = id;

        let current_page = Math.max(0, page);
        let pageNum = current_page
        --current_page

        POEM.find({ author: current_id }).countDocuments().then((count: any) => {

            const limit = Math.ceil(count / perpage)

            POEM.find({ author: current_id })
                .populate('author')
                .skip(perpage * page)
                .limit(perpage)
                .sort('title')
                .then(poemList => {

                    let data = {
                        poems: poemList,
                        pagination: {
                            perPage: perpage,
                            page: pageNum,
                            lastPage: limit,
                            total: count
                        }
                    }

                    response.is_valid = true;
                    response.data = data;
                    resolve(response);
                }).catch((err: any) => {

                    response.status = 400;
                    response.data = err;
                    reject(response);
                })
        }).catch((err: any) => {

            response.status = 400;
            response.data = err;
            reject(response);
        })
    });
}
