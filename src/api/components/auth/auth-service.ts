'use strict';

// Modelos
import USER, { User } from '../users/users-model';
// Ayudantes
import * as jwt from '../../helpers/jwt';
import Email from '../../helpers/Email';
import { logger_users } from '../../helpers/logger';
import response_data from '../../utils/response_data';
// Configuración
import config from '../../config'
// Tipos
import Response_data from '../../types/Response_data';

export default class AuthService {

    protected userLogin(email: string, password: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            USER.findOne({ email: email }).then((current_user: any) => {

                if (!current_user.verified) throw new Error('user not verified');

                current_user.compare_password(password).then((match: boolean) => {

                    const token = jwt.create_token(current_user, 'user');

                    response.status = 200;
                    response.result = token;
                    resolve(response);
                }).catch((not_match: any) => {
                    response.status = 401;
                    response.message = 'Unauthorized';

                    logger_users.info(response, 'service')
                    reject(response);
                })
            }).catch((err: any) => {

                response.status = 401;
                response.message = 'Unauthorized';

                let responseFail = response;
                responseFail.result = err;
                logger_users.info(responseFail, 'service')
                reject(response);
            })
        });
    }

    protected userCreate(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            const user: User = new USER(data);

            user.save().then((res: any) => {

                const verify_token = jwt.create_token(res, 'verify_account');

                const email: any = new Email();
                email.to = res.email;
                email.subject = 'Verifica tu cuenta de usuario';
                email.text = 'Hola,\n' +
                    'Por favor, verifica tu cuenta de usuario haciendo clic en:\n' +
                    config.app.url_api + 'users\/confirmAccount\/' + verify_token.token + '.\n';
                email.send();

                response.status = 201;
                response.message = 'Created';

                response.result = { _id: res._id };
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

    protected confirmAccountWithToken(token: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            jwt.confirm_token_new_account(token).then((user: any) => {

                USER.findByIdAndUpdate(user._id, { verified: true, $unset: { expire_at: 1 } }).then((res: any) => {

                    response.message = 'Account verified!!';
                    resolve(response);
                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';

                    let responseFail = response;
                    responseFail.result = err;
                    logger_users.info(responseFail, 'service')
                    reject(response);
                })

            }).catch((err: any) => {

                response.status = err.status;
                response.message = err.message;

                let responseFail = response;
                responseFail.result = err;
                logger_users.info(responseFail, 'service')
                reject(response);
            })
        });
    }

}