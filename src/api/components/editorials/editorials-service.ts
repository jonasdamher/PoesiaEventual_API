'use strict';

// Modelos
import EDITOR, { Editorial } from './editorials-model';
// Ayudantes
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';
import { logger_editorials } from '../../helpers/logger';

export default class EditorialsService {

    protected  get_all_editorials(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            EDITOR.find().sort('name').then((res: any) => {

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

    protected get_editorial_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            EDITOR.findById(id).then((res: any) => {

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

    protected create_editorial(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();
            const new_genre: Editorial = new EDITOR(data);

            new_genre.save().then((res: Editorial) => {

                response.status = 201;
                response.message = 'Created';
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
}