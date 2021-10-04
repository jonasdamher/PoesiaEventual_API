'use strict';

// Modelos
import OCCUPATION, { Occupation } from './occupations-model';
// Ayudantes
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';

export default class OccupationService {

    get_all_occupations(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            OCCUPATION.find().sort('name').then((res: any) => {

                response.result = res;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }

    get_occupation_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            OCCUPATION.findById(id).then((res: any) => {

                response.result = res;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            })
        });
    }

    create_occupation(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();
            const new_occupation: Occupation = new OCCUPATION(data);

            new_occupation.save().then((occupation_created: Occupation) => {

                response.status = 201;
                response.message = 'Created';
                response.result = occupation_created;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            })
        });
    }
}