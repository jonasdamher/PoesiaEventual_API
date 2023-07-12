'use strict';

// Modelos
import USER, { User } from './users-model';
// Ayudantes
import { logger_users } from '../../helpers/logger';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';

export default class UsersService {

    /**
     * Obtiene la información de una cuenta de usuario mediante el ID.
     * @param id 
     * @returns Objeto con nombre, apellidos, email
     */
    protected getUserById(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            USER.findById(id).select('name lastname email').then((res: any) => {

                response.result = res;
                resolve(response)
            }).catch((err: any) => {
                response.message = 'Dont found';
                response.status = 404;

                let responseFail = response;
                responseFail.result = err;
                logger_users.info(responseFail, 'service')
                reject(response);
            })
        });
    }

    /**
     * Actualiza una cuenta de usuario mediante el ID
     * @param id 
     * @param data 
     * @returns string || object
     */
    protected updateUserById(id: string, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();


            USER.findByIdAndUpdate(id, data, { new: true }).select('name lastname email ').then((res: any) => {

                response.message = 'Update';
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';

                let responseFail = response;
                responseFail.result = err;
                logger_users.info(responseFail, 'service')
                reject(response);
            })
        });
    }

    protected deleteUserById(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            let response = response_data();

            USER.findByIdAndDelete(id).then((res: any) => {

                response.message = '';
                response.result = res._id;

                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';

                let responseFail = response;
                responseFail.result = err;
                logger_users.info(responseFail, 'service')
                reject(response);
            })
        });
    }
}