'use strict';

// Modelos
import GENRE, { Genre } from './genres-model';
// Ayudantes
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';

export {
    get_all,
    get_with_id,
    create
}

function get_all(): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        GENRE.find().sort('name').then((res: any) => {

            response.result= res;
            response.is_valid = true;
            resolve(response);

        }).catch((err: any) => {

            response.status = 404;
            response.result= err;
            reject(response);
        });
    });
}

function get_with_id(id: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        GENRE.findById(id).then((res: any) => {

            response.result= res;
            response.is_valid = true;
            resolve(response)
        }).catch((err: any) => {

            response.status = 404;
            response.result= err;
            reject(response);
        })
    });
}

function create(data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();
 
        const new_genre: Genre = new GENRE(data);

        new_genre.save().then((res: Genre) => {
            
            response.status = 201;
            response.result= res;
            response.is_valid = true;
            resolve(response)
        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
            reject(response);
        })
    });
}