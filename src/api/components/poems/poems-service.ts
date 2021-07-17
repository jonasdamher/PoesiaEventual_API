'use strict';

import POEM, { Poem } from './poems-model';
// Ayudantes
import { logger_poems } from '../../helpers/logger';
import Text from '../../helpers/Text';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export {
    get_all,
    get_all_poems_of_author,
    get_poems_of_author,
    get_by_id,
    search,
    random,
    create
}

function get_all(page: number, perpage: number): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        let current_page = Math.max(0, page)
        let pageNum = current_page
        --current_page

        POEM.find().countDocuments().then((count: any) => {

            const limit = Math.ceil(count / perpage)

            POEM.find()
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

                    response.result= data;
                    response.is_valid = true;
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.result= err;
                    reject(response);
                });

        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
            reject(response);
        });
    });
}

function get_poems_of_author(id: any) {
    return new Promise((resolve, reject) => {
        const current_id: Schema.Types.ObjectId = id;

        POEM.findOne({ author: current_id })
            .select('title meta.url')
             .then((poems: any) => {
                 if(!poems){
                    resolve([]);
                 }
                if(poems.length>1){
                    resolve(poems);
                }
                resolve([poems]);
            }).catch((err: any) => {
                logger_poems.info(err,'service');

                reject([])
            })
    })
}

function get_all_poems_of_author(page: number, perpage: number, id: any): Promise<Response_data> {
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
                    response.result= data;
                    resolve(response);
                }).catch((err: any) => {

                    response.status = 400;
                    response.result= err;
                     reject(response);
                })
        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
             reject(response);
        })
    });
}

function get_by_id(id: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        let response = response_data();

        POEM.findById({ _id: id }).populate('author', 'name').then((poem: any) => {
            response.is_valid = true;
            response.result= poem;
            resolve(response);
        }).catch((err: any) => {
            response.status = 400;
            response.result= err;
            reject(response)
        })
    })
}

function search(page: number, perpage: number, search: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        let current_page = Math.max(0, page)
        let pageNum = current_page
        --current_page

        POEM.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(count => {

            const limit = Math.ceil(count / perpage)

            POEM.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } })
                .populate('author')
                .skip(perpage * current_page)
                .limit(perpage)
                .sort('title')
                .then((poems: any) => {

                    let data = {
                        poems: poems,
                        pagination: { perPage: perpage, page: pageNum, lastPage: limit, total: count }
                    }

                    response.is_valid = true;
                    response.result= data;
                    resolve(response)

                }).catch((err: any) => {

                    response.status = 400;
                    response.result= err;
                    reject(response)
                })

        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
            reject(response)
        })
    })
}

function random(): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        POEM.find().countDocuments().then(count => {

            const random = Math.floor(Math.random() * count)

            POEM.findOne().populate('author', 'name').skip(random).then(poem => {

                response.is_valid = true;
                response.result= poem;
                resolve(response)

            }).catch((err: any) => {

                response.status = 400;
                response.result= err;
                reject(response)
            })

        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
            reject(response)
        })
    })
}

function create(data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();
        
         data.meta.url = Text.url(data.title);

        const poem: Poem = new POEM(data);

        poem.save().then((new_poem: Poem) => {

            response.status = 201;
            response.is_valid = true;
            response.result= new_poem;
            resolve(response)

        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
            reject(response)
        })
    })
}
