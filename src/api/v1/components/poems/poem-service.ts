'use strict';

import POEM, { Poem } from './poem-model';
// Ayudantes
import response_data from '../../helpers/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export {
    getWithId,
    searchPoem,
    random,
    create,
    update
}

function getWithId(id: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        let response = response_data();

        POEM.findById({ _id: id }).populate('author', 'name').then((poem: any) => {
            response.is_valid = true;
            response.data = poem;
            resolve(response);
        }).catch((err: any) => {
            response.status = 400;
            response.data = err;
            reject(response)
        })
    })
}

function searchPoem(page: number, perpage: number, search: string): Promise<Response_data> {
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
                    response.data = data;
                    resolve(response)

                }).catch((err: any) => {

                    response.status = 400;
                    response.data = err;
                    reject(response)
                })

        }).catch((err: any) => {

            response.status = 400;
            response.data = err;
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
                response.data = poem;
                resolve(response)

            }).catch((err: any) => {

                response.status = 400;
                response.data = err;
                reject(response)
            })

        }).catch((err: any) => {

            response.status = 400;
            response.data = err;
            reject(response)
        })
    })
}

function create(data_body: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        const poem: Poem = new POEM(data_body);

        poem.save().then(poem => {

            response.status = 201;
            response.is_valid = true;
            response.data = poem;
            resolve(response)
        }).catch((err: any) => {

            response.status = 400;
            response.data = err;
            reject(response)
        })
    })
}

function update(id: string, data_body: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        POEM.findByIdAndUpdate(id, data_body, { new: true }).then((authorResponse: any) => {

            response.is_valid = true;
            response.data = authorResponse;
            resolve(response)
        }).catch((err: any) => {

            response.status = 400;
            response.data = err;
            reject(response)
        })
    })
}