'use strict';

// Modelos
import USER, { User } from './users-model';
// Ayudantes
import * as jwt from '../../helpers/jwt';
import Email from '../../helpers/Email';
import response_data from '../../utils/response_data';
import { logger_users } from '../../helpers/logger';

// Configuración
import config from '../../config'
// Tipos
import Response_data from '../../types/Response_data';

export {
    get_by_id,
    login,
    create,
    confirm_account,
    update
}

function get_by_id(id: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        USER.findById(id).select('name lastname email').then((res: any) => {

            response.result= res;
            response.is_valid = true;
            resolve(response)
        }).catch((err: any) => {

            response.message = 'Dont found';
            response.status = 404;
            response.result= err;
            logger_users.info({ response }, 'service')
            reject(response);
        })
    });
}

function login(email: string, password: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        USER.findOne({ email: email }).then((current_user: any) => {

            if (!current_user.verified) {
                throw new Error('user not verified');
            }

            current_user.compare_password(password).then((match: boolean) => {

                const token = jwt.create_token(current_user, 'user');

                response.is_valid = true;
                response.result= token;
                resolve(response);
            }).catch((not_match: any) => {
                response.message = 'Unauthorized';
                response.status = 401;
                logger_users.info({ response }, 'service')
                reject(response)
            })
        }).catch((err: any) => {
            response.message = 'Unauthorized';
            response.status = 401;
            response.result= err;
            logger_users.info({ response }, 'service')

            reject(response)
        })
    });
}

function create(data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();
        const user: User = new USER(data);

        user.save().then((res: User) => {

            const verify_token = jwt.create_token(res, 'verify_account');

            const email: any = new Email();
            email.to = res.email;
            email.subject = 'Verifica tu cuenta de usuario';
            email.text = 'Hola,\n' +
                'Por favor, verifica tu cuenta de usuario haciendo clic en:\n' +
                config.app.url_api + 'users\/confirm_account\/' + verify_token.token + '.\n';

            email.send();

            response.result= { _id: res._id };
            response.message = 'Created';
            response.status = 201;
            response.is_valid = true;
            resolve(response)
        }).catch((err: any) => {

            response.message = 'BadRequest';
            response.status = 400;
            response.result= err;

            logger_users.info({ response }, 'service')
            reject(response);
        })
    });
}

function confirm_account(token: string): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        jwt.confirm_token_new_account(token).then((user: any) => {

            USER.findByIdAndUpdate(user._id, { verified: true, $unset: { expire_at: 1 } }).then((res: any) => {

                response.message = 'Account verified!!';
                response.is_valid = true;
                resolve(response);
            }).catch((err: any) => {

                response.message = 'BadRequest';
                response.status = 400;
                response.result= err;
                logger_users.info({ response }, 'service')
                reject(response);
            })

        }).catch((err: any) => {

            response.status = err.status;
            response.message = err.message;
            logger_users.info({ response }, 'service')
            reject(response);
        })
    });
}

function update(id: string, data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {

        const response = response_data();

        USER.findByIdAndUpdate(id, data, { new: true }).select('name lastname email ').then((res: any) => {

            response.message = 'Update';
            response.status = 200;
            response.is_valid = true;
            resolve(response);
        }).catch((err: any) => {

            response.message = 'BadRequest';
            response.status = 400;
            response.result= err;

            logger_users.info({ response }, 'service')
            reject(response);
        })
    });
}