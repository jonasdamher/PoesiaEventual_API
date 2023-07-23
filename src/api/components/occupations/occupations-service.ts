'use strict';

// Modelos
import OCCUPATION, { Occupation } from './occupations-model';
// Ayudantes
import { logger_occupation } from '../../helpers/logger';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';

export default class OccupationService {

    protected get_all_occupations(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            OCCUPATION.find().sort('name').then((res: Occupation[] | null) => {

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

    protected get_occupation_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            OCCUPATION.findById(id).then((res: Occupation | null) => {

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

    protected create_occupation(data: Partial<Occupation>): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();
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
                logger_occupation.info(err, 'service');
                reject(response);
            });
        });
    }

    protected update_occupation(id: string, data: Partial<Occupation>): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            OCCUPATION.findByIdAndUpdate(id, { $set: data }, { new: true }).then((res: Occupation | null) => {

                response.result = res;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_occupation.info(err, 'service');
                reject(response);
            });
        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            const occup: Occupation = new OCCUPATION({ _id: id });

            occup.deleteOccupation().then((result: Occupation | null) => {
                response.result = result;

                resolve(response);

            }).catch((err: any) => {

                response.status = 404;
                response.message = 'Not found';
                response.result = err;

                reject(response);
            });
        });
    }

}