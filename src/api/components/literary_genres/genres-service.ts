'use strict';

// Modelos
import GENRE, { Genre } from './genres-model';
// Ayudantes
import response_data from '../../utils/response_data';
import { logger_genre } from '../../helpers/logger';
import { array_filter } from '../../utils/filter';
// Tipos
import Response_data from '../../types/Response_data';
import { Error } from 'mongoose';

export default class GenresService {

    protected get_all_genres(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            GENRE.find().sort('name').then((res: Genre[] | null) => {

                response.result = res;
                resolve(response);
            }).catch((err: Error) => {

                response.status = 400;
                response.message = 'Dont found';
                response.result = err;
                reject(response);
            });
        });
    }

    protected get_genre_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            GENRE.findById(id).then((res: Genre | null) => {

                response.result = res;
                resolve(response);
            }).catch((err: Error) => {
                response.status = 404;
                response.message = 'Not found';
                response.result = err;
                reject(response);
            });
        });
    }

    protected create_genre(data: Partial<Genre>): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            const new_genre: Genre = new GENRE(data);

            new_genre.save().then((genreResponse: Genre) => {

                response.status = 201;
                response.message = 'Created';
                response.result = genreResponse;
                resolve(response);

            }).catch((err: Error) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_genre.info({ err }, 'service');
                reject(response);
            });
        });
    }
    protected update_genre(id: string, data: Partial<Genre>): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            GENRE.findById(id).then((genreResponse: any) => {

                if (data.subgenres) {
                    const other_subgenres = array_filter(genreResponse.subgenres, data.subgenres, '_id');
                    data.subgenres = data.subgenres.concat(other_subgenres);
                }

                GENRE.findByIdAndUpdate(id, { $set: data }, { new: true }).then((res: Genre | null) => {

                    response.result = res;
                    resolve(response);

                }).catch((err: Error) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    logger_genre.info({ err }, 'service');
                    reject(response);
                });

            }).catch((err: Error) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_genre.info({ err }, 'service');
                reject(response);
            });

        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            GENRE.findByIdAndDelete(id).then((result: Genre | null) => {
                response.result = result;
                resolve(response);

            }).catch((err: Error) => {

                response.status = 404;
                response.message = 'Not found';
                response.result = err;

                reject(response);
            });
        });
    }

}