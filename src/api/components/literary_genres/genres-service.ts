'use strict';

// Modelos
import GENRE, { Genre } from './genres-model';
// Ayudantes
import response_data from '../../utils/response_data';
import { logger_genre } from '../../helpers/logger';
// Tipos
import Response_data from '../../types/Response_data';

export default class GenresService {

    protected get_all_genres(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            GENRE.find().sort('name').then((res: any) => {

                response.result = res;
                resolve(response);
            }).catch((err: any) => {

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

            GENRE.findById(id).then((res: any) => {

                response.result = res;
                resolve(response);
            }).catch((err: any) => {
                response.status = 404;
                response.message = 'Not found';
                response.result = err;
                reject(response);
            });
        });
    }

    protected create_genre(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            const new_genre: Genre = new GENRE(data);

            new_genre.save().then((genreResponse: Genre) => {

                response.status = 201;
                response.message = 'Created';
                response.result = genreResponse;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_genre.info({ err }, 'service');
                reject(response);
            });
        });
    }
    protected update_genre(id: any, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            GENRE.findById(id).then((genreResponse: any) => {

                if (data.subgenres && Array.isArray(data.subgenres) && data.subgenres.length) {

                    genreResponse.subgenres.forEach((updatedBook: any) => {

                        // Filtrar libros existentes para actualizar
                        const existing = data.subgenres.findIndex((exists: any) => exists._id === updatedBook._id.toString());

                        if (existing === -1) {
                            data.subgenres.push(updatedBook);
                        }

                    });
                }

                GENRE.findByIdAndUpdate(id, { $set: data }, { new: true }).then((res: any) => {

                    response.result = res;
                    resolve(response);

                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    response.result = err;
                    logger_genre.info({ err }, 'service');
                    reject(response);
                });

            }).catch((err: any) => {
                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_genre.info({ err }, 'service');
                reject(response);
            });

        });
    }

}