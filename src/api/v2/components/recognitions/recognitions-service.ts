'use strict';

import RECOG, { Recognition } from './recognitions-model';
// Ayudantes
import { logger_recognitions } from '../../helpers/logger';
import Text from '../../helpers/Text';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export {
    getAll,
    get_recognitions_of_author,
    getWithId,
    search,
    create
}

function getAll(page: number, perpage: number): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        let current_page = Math.max(0, page)
        let pageNum = current_page
        --current_page

        RECOG.find().countDocuments().then((count: any) => {

            const limit = Math.ceil(count / perpage)

            RECOG.find()
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

function getWithId(id: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        let response = response_data();

        RECOG.findById({ _id: id }).populate('author', 'name').then((poem: any) => {
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

        RECOG.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).countDocuments().then(count => {

            const limit = Math.ceil(count / perpage)

            RECOG.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } })
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

function get_recognitions_of_author(id: any) {
    return new Promise((resolve, reject) => {
        const current_id: Schema.Types.ObjectId = id;

        RECOG.findOne({ author: current_id })
            .select('title age posthumous meta.url')
            .then((recognitions: any) => {
                if(!recognitions){
                    resolve([]);
                 }
                if (recognitions.length > 1) {
                    resolve(recognitions);
                }
                resolve([recognitions]);
            }).catch((err: any) => {
                logger_recognitions.info(err, 'service');

                reject([])
            })
    })
}

function create(data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();
        const text = new Text();

        data.meta.url = text.url(data.title);
        const poem: Recognition = new RECOG(data);

        poem.save().then((new_poem: Recognition) => {

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
