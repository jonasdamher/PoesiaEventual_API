'use strict';

import RECOG, { Recognition } from './recognitions-model';
// Ayudantes
import { logger_recognitions } from '../../helpers/logger';
import response_data from '../../utils/response_data';
import { get_pagination, paginate } from '../../utils/pagination';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export default class RecogService {

    protected get_all_recog(page: number, perPage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            get_pagination(RECOG, page, perPage).then((pagination: any) => {

                RECOG.find().skip(pagination.page_range).limit(pagination.perPage).sort('name')
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

    protected get_recog_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            RECOG.findById(id).populate('author', 'name').then((poem: any) => {

                response.result = poem;
                resolve(response);
            }).catch((err: any) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }

    protected search_recogs(page: number, perPage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            const query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };

            get_pagination(RECOG, page, perPage, query).then((pagination: any) => {

                RECOG.find(query).populate('author').skip(pagination.page_range).limit(pagination.perPage).sort('title')
                    .then((poems: any) => {

                        const result = {
                            poems: poems,
                            pagination: paginate(pagination)
                        };

                        response.result = result;
                        resolve(response);
                    }).catch((err: any) => {

                        response.status = 400;
                        response.message = 'BadRequest';
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

    protected create_recog(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            const poem: Recognition = new RECOG(data);

            poem.save().then((res: Recognition) => {
                response.status = 201;
                response.result = res;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;

                logger_recognitions.info(err, 'service');

                reject(response);
            });
        });
    }

    protected update_recog(id: any, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            RECOG.findByIdAndUpdate(id, { $set: data }, { new: true }).then((update: any) => {
                response.result = update;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;

                logger_recognitions.info(err, 'service');

                reject(response);
            });

        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            RECOG.findByIdAndDelete(id).then((result: any) => {
                response.result = result;
                resolve(response);

            }).catch((err: any) => {

                response.status = 404;
                response.message = 'Not found';
                response.result = err;

                logger_recognitions.info(err, 'service');

                reject(response);
            });
        });
    }



}