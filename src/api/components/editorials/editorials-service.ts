'use strict';

// Modelos
import EDITOR, { Editorial } from './editorials-model';
// Ayudantes
import response_data from '../../utils/response_data';
import { logger_editorials } from '../../helpers/logger';
// Tipos
import Response_data from '../../types/Response_data';
import { Error } from 'mongoose';

export default class EditorialsService {

    protected get_all_editorials(): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            EDITOR.find().sort('name').then((res: Editorial[] | null) => {

                response.result = res;
                resolve(response);

            }).catch((err: Error) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }

    protected get_editorial_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            EDITOR.findById(id).then((res: Editorial | null) => {

                response.result = res;
                resolve(response);

            }).catch((err: Error) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });
        });
    }

    protected create_editorial(data: Partial<Editorial>): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();
            const new_genre: Editorial = new EDITOR(data);

            new_genre.save().then((res: Editorial) => {

                response.status = 201;
                response.message = 'Created';
                response.result = res;
                resolve(response);

            }).catch((err: Error) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_editorials.info(err, 'service');
                reject(response);
            });
        });
    }

    protected update_editorial(id: string, data: Partial<Editorial>): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            EDITOR.findByIdAndUpdate(id, { $set: data }, { new: true }).then((res: Editorial | null) => {

                response.result = res;
                resolve(response);

            }).catch((err: Error) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                logger_editorials.info(err, 'service');
                reject(response);
            });
        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            EDITOR.findByIdAndDelete(id).then((result: Editorial | null) => {
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