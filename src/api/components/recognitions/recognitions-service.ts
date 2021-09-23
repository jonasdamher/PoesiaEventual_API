'use strict';

import RECOG, { Recognition } from './recognitions-model';
// Ayudantes
import { logger_recognitions } from '../../helpers/logger';
import Text from '../../helpers/Text';
import response_data from '../../utils/response_data';
import ResponseHandler from '../../helpers/ResponseHandler';
import { get_pagination, paginate } from '../../utils/pagination';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export default class RecogService extends ResponseHandler {

    get_all_recog(page: number, perpage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            get_pagination(RECOG, page, perpage).then((pagination: any) => {

                RECOG.find().skip(pagination.page_range).limit(pagination.perpage).sort('name')
                    .then((authorResponse: any) => {

                        let result = {
                            authors: authorResponse,
                            pagination: paginate(pagination)
                        };

                        this.result(result);
                        resolve(this.response());
                    }).catch((err: any) => {

                        this.status(400).message('BadRequest').result(err);
                        reject(this.response());
                    });

            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            });
        });
    }

    get_recog_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            let response = response_data();

            RECOG.findById(id).populate('author', 'name').then((poem: any) => {

                this.result(poem);
                resolve(this.response());
            }).catch((err: any) => {
                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        })
    }

    search_recogs(page: number, perpage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            let query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };

            get_pagination(RECOG, page, perpage, query).then((pagination: any) => {

                RECOG.find(query).populate('author').skip(pagination.page_range).limit(pagination.perpage).sort('title')
                    .then((poems: any) => {

                        let result = {
                            poems: poems,
                            pagination: paginate(pagination)
                        }

                        this.result(result);
                        resolve(this.response())
                    }).catch((err: any) => {

                        this.status(400).message('BadRequest').result(err);
                        reject(this.response());
                    })

            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        })
    }

    get_recognitions_of_author(id: any) {
        return new Promise((resolve, reject) => {
            const current_id: Schema.Types.ObjectId = id;

            RECOG.findOne({ author: current_id })
                .select('title age posthumous meta.url')
                .then((recognitions: any) => {
                    if (!recognitions) {
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

    create_recog(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            data.meta.url = Text.url(data.title);
            const poem: Recognition = new RECOG(data);

            poem.save().then((new_poem: Recognition) => {

                this.status(201).result(new_poem);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        })
    }
}