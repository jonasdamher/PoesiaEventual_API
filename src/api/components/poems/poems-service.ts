'use strict';

import POEM, { Poem } from './poems-model';
// Ayudantes
import { logger_poems } from '../../helpers/logger';
import Text from '../../helpers/Text';
import ResponseHandler from '../../helpers/ResponseHandler';
import { get_pagination, paginate } from '../../utils/pagination';
// Tipos
import Response_data from '../../types/Response_data';
import { Schema } from 'mongoose';

export default class PoemsService extends ResponseHandler {

    get_all_poems(page: number, perpage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            get_pagination(POEM, page, perpage).then((pagination: any) => {

                POEM.find().skip(pagination.page_range).limit(pagination.perpage).sort('name')
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

    get_poems_of_author(id: any) {
        return new Promise((resolve, reject) => {

            const current_id: Schema.Types.ObjectId = id;

            POEM.findOne({ author: current_id }).select('title meta.url').then((poems: any) => {
                if (!poems) resolve([]);
                if (poems.length > 1) resolve(poems);
                resolve([poems]);
            }).catch((err: any) => {
                logger_poems.info(err, 'service');
                reject([]);
            })
        })
    }

    get_all_poems_of_author_by_id(page: number, perpage: number, id: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const current_id: Schema.Types.ObjectId = id;
            let query = { author: current_id };

            get_pagination(POEM, page, perpage, query).then((pagination: any) => {

                POEM.find(query)
                    .populate('author')
                    .skip(pagination.page_range)
                    .limit(pagination.perpage)
                    .sort('title')
                    .then(poemList => {

                        let result = {
                            poems: poemList,
                            pagination: paginate(pagination)
                        }

                        this.result(result);
                        resolve(this.response());
                    }).catch((err: any) => {

                        this.status(400).message('BadRequest').result(err);
                        reject(this.response());
                    })
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        });
    }

    get_poem_by_id_(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {


            POEM.findById({ _id: id }).populate('author', 'name').then((poem: any) => {

                this.result(poem);
                resolve(this.response());
             }).catch((err: any) => {
                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        })
    }

    search_poem(page: number, perpage: number, search: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            let query = { title: { $regex: '.*' + search + '.*', $options: 'i' } };

            get_pagination(POEM, page, perpage, query)
                .then((pagination: any) => {

                    POEM.find(query).populate('author').skip(pagination.page_range).limit(pagination.perpage).sort('title')
                        .then((poems: any) => {

                            let result = {
                                poems: poems,
                                pagination: paginate(pagination)
                            }

                            this.result(result);
                            resolve(this.response());

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

    random_poem(): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            POEM.find().countDocuments().then((count:any) => {

                const random = Math.floor(Math.random() * count)

                POEM.findOne().populate('author', 'name').skip(random).then((poem: any) => {

                    this.result(poem);
                    resolve(this.response());

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

    create_poem(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            data.meta.url = Text.url(data.title);

            const poem: Poem = new POEM(data);

            poem.save().then((new_poem: Poem) => {

                this.status(201).message('Created').result(new_poem);
                resolve(this.response());

            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        })
    }
}