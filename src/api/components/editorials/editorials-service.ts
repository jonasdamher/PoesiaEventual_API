'use strict';

// Modelos
import EDITOR, { Editorial } from './editorials-model';
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

        EDITOR.find().sort('name').then((res: any) => {

                response.result= res;
                
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.result= err;
                reject(response);
            });
    });
}

function get_with_id(id: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        EDITOR.findById(id).then((res: any) => {

            response.result= res;
            
            resolve(response)
        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
            reject(response);
        })
    });
}

function create(data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        const new_genre: Editorial = new EDITOR(data);

        new_genre.save().then((res: Editorial) => {
            response.status = 201;

            response.result= res;
            
            resolve(response)
        }).catch((err: any) => {

            response.status = 400;
            response.result= err;
            reject(response);
        })
    });
}