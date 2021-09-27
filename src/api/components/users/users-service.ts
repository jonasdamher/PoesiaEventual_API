'use strict';

// Modelos
import USER, { User } from './users-model';
// Ayudantes
import * as jwt from '../../helpers/jwt';
import Email from '../../helpers/Email';
import { logger_users } from '../../helpers/logger';
import ResponseHandler from '../../helpers/ResponseHandler';
// Configuración
import config from '../../config'
// Tipos
import Response_data from '../../types/Response_data';

export default class UsersService extends ResponseHandler {
    get_user_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            USER.findById(id).select('name lastname email').then((res: any) => {

                super.result(res);
                resolve(super.response())
            }).catch((err: any) => {

                super.message('Dont found').status(404).result(err);
                logger_users.info({ ...super.response() }, 'service')
                reject(super.response());
            })
        });
    }

    user_login(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {

            USER.findOne({ email: email }).then((current_user: any) => {

                 if (!current_user.verified) {
                    throw new Error('user not verified');
                }

                current_user.compare_password(password).then((match: boolean) => {

                    const token = jwt.create_token(current_user, 'user');

                    resolve({ status: 200, result: { ...token } });
                }).catch((not_match: any) => {
                    logger_users.info({ status: 401, result: null, message: 'Unauthorized' }, 'service')
                    reject({ status: 401, result: null, message: 'Unauthorized' });
                })
            }).catch((err: any) => {

                logger_users.info({ status: 401, result: err, message: 'Unauthorized' }, 'service')
                reject({ status: 401, result: err, message: 'Unauthorized' });
            })
        });
    }

    user_create(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const user: User = new USER(data);

            user.save().then((res: any) => {

                const verify_token = jwt.create_token(res, 'verify_account');

                const email: any = new Email();
                email.to = res.email;
                email.subject = 'Verifica tu cuenta de usuario';
                email.text = 'Hola,\n' +
                    'Por favor, verifica tu cuenta de usuario haciendo clic en:\n' +
                    config.app.url_api + 'users\/confirm_account\/' + verify_token.token + '.\n';
                email.send();

                super.status(201).message('Created').result({ _id: res._id });
                resolve(super.response());
            }).catch((err: any) => {

                super.message('BadRequest').status(400).result(err);
                logger_users.info({ ...super.response() }, 'service')
                reject(super.response());
            })
        });
    }

    confirm_account_by_token(token: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            jwt.confirm_token_new_account(token).then((user: any) => {

                USER.findByIdAndUpdate(user._id, { verified: true, $unset: { expire_at: 1 } }).then((res: any) => {

                    super.message('Account verified!!');
                    resolve(super.response());
                }).catch((err: any) => {

                    super.message('BadRequest').status(400).result(err);
                    logger_users.info({ ...super.response() }, 'service')
                    reject(super.response());
                })

            }).catch((err: any) => {

                super.message(err.message).status(err.status).result(err);
                logger_users.info({ ...super.response() }, 'service')
                reject(super.response());
            })
        });
    }

    update_user_by_id(id: string, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {


            USER.findByIdAndUpdate(id, data, { new: true }).select('name lastname email ').then((res: any) => {

                super.message('Update');
                resolve(super.response());
            }).catch((err: any) => {

                super.message('BadRequest').status(400).result(err);
                logger_users.info({ ...super.response() }, 'service')
                reject(super.response());
            })
        });
    }
}