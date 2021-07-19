'use strict';

// Modelos
import OCCUPATION, { Occupation } from './occupations-model';
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

        OCCUPATION.find().sort('name').then((res: any) => {

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

        OCCUPATION.findById(id).then((res: any) => {

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

        const new_occupation: Occupation = new OCCUPATION(data);

        new_occupation.save().then((res: Occupation) => {
          
            response.status = 201;
            response.result= res;
            
            resolve(response);
        }).catch((err: any) => {
console.log(err)
            response.status = 400;
            response.result= err;
            reject(response);
        })
    });
}