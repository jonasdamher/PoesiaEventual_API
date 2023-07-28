'use strict';

// Modelos
import USER, { User } from '../users/users-model';
// Ayudantes
import * as jwt from '../../helpers/jwt';
import Email from '../../helpers/Email';
import { logger_users } from '../../helpers/logger';
import response_data from '../../utils/response_data';
// Tipos
import Response_data from '../../types/Response_data';

export default class AuthService {

    /**
     * Autenticar correo y clave.
     * @param email 
     * @param password 
     * @returns JSON web token
     */
    protected userLogin(email: string, password: string): Promise<Response_data> {
        return new Promise(async (resolve, reject) => {
            const response = response_data();

            try {

                const current_user: User = await USER.findOne({ email: email }).select('_id name lastname role verified password');

                if (!current_user.verified) throw new Error('user not verified');

                current_user.compare_password(password).then(() => {

                    const token = jwt.create_token(current_user, 'user');
                    response.result = token;
                    resolve(response);

                }).catch((not_match: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';
                    reject(response);

                });
            } catch (err: any) {
                
                response.status = 400;
                response.message = 'BadRequest';
                reject(response);
            }
        });
    }

    /**
     * Crear cuenta de usuario y envia correo electrónico de confirmación de cuenta.
     * @param data 
     * @returns ID de cuenta de usuario.
     */
    protected userCreate(data: User): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            const user: User = new USER(data);

            user.save().then((res: User) => {

                const verify_token = jwt.create_token(res, 'verify_account');

                const email = new Email();
                email.send_token(res.email, verify_token.token);

                response.status = 201;
                response.message = 'Created';

                response.result = { _id: res._id };
                resolve(response);
            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';

                const responseFail = response;
                responseFail.result = err;
                logger_users.info(responseFail, 'service');
                reject(response);
            });
        });
    }

    /**
     * Verifica si el token existe, si existe deja la cuenta de usuario correspondiente como activa.
     * @param token 
     * @returns Mensaje de verificación
     */
    protected confirmAccountWithToken(token: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            let response = response_data();

            jwt.confirm_token_new_account(token).then((user: any) => {

                USER.findByIdAndUpdate(user._id, { verified: true, $unset: { expire_at: 1 } }).then((res: User | null) => {

                    response.message = 'Account verified!!';
                    resolve(response);
                }).catch((err: any) => {

                    response.status = 400;
                    response.message = 'BadRequest';

                    const responseFail = response;
                    responseFail.result = err;
                    logger_users.info(responseFail, 'service');
                    reject(response);
                });

            }).catch((err: any) => {

                response = err;
                logger_users.info(response, 'service');
                reject(response);
            });
        });
    }

}