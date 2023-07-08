'use strict';

// Modelos
import GENRE, { Genre } from './genres-model';
// Ayudantes
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';

export default class GenresService {

    get_all_genres(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            GENRE.find().sort('name').then((res: any) => {

                response.result = res;
                resolve(response);
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'Dont found';
                response.result = err;
                // logger_authors.info({ ...response }, 'service');
                reject(response);
            });
        });
    }

    get_genre_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            GENRE.findById(id).then((res: any) => {

                response.result = res;
                resolve(response);
            }).catch((err: any) => {
                response.status = 404;
                response.message = 'Not found';
                response.result = err;
                // logger_authors.info({ ...response }, 'service');
                reject(response);
            })
        });
    }

    create_genre(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            const new_genre: Genre = new GENRE(data);

            new_genre.save().then((genreResponse: Genre) => {

                response.status = 201;
                response.message = 'Created';
                response.result = genreResponse;
                resolve(response)

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                // logger_authors.info({ ...response }, 'service');
                reject(response);
            })
        });
    }
}