'use strict';

/**
 * Para crear y renovar tokens con JWT.
 */
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config';

import USER from '../components/users/users-model';

export {
    create_token,
    create_refresh_token,
    refresh_token,
    confirm_token,
    confirm_token_new_account
};

/**
 * Crea un token con el nombre, apellidos, id y rol de usuario
 * con la duración de 1 día.
 * @param user 
 * @returns Objeto con json web token y tiempo de expiración.
 */
function create_token(user: any, type_token: string) {

    const expire_token: number = moment().add(1, 'days').unix();
    const current_data_time: number = moment().unix();

    const data = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        type_token: type_token,
        iat: current_data_time,
        nbf: current_data_time,
        exp: expire_token
    }

    const token: string = jwt.sign(data, config.jwt.secret_token);

    return {
        token: token,
        expire_token: expire_token
    }
}

/**
 * Crea un token con el nombre, apellidos, id y rol de usuario
 * con la duración de 2 días.
 * @param user 
 * @returns Token renovado.
 */
function create_refresh_token(user: any): string {

    const expire_token: number = moment().add(2, 'days').unix();
    const current_data_time: number = moment().unix();

    const data = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        type_token: 'user',
        iat: current_data_time,
        nbf: current_data_time,
        exp: expire_token
    }

    return jwt.sign(data, config.jwt.secret_token);
}

/**
 * Refresca el token actual pasado por parámetros y te devuelve uno nuevo.
 * @param refresh_token Token actual
 * @param grant_type Tipo = refresh_token
 * @param USER modelo de tipo de usuario
 * @returns Objecto con token, expiración.
 */
async function refresh_token(refresh_token: string, grant_type: string, USER: any) {
    return new Promise((resolve, reject) => {

        if (refresh_token && grant_type === 'refresh_token') {

            jwt.verify(refresh_token, config.jwt.secret_refresh_token, (err: any, data: any) => {

                if (err) reject({ status: 400, message: 'TokenExpired' });

                if (data.type_token !== 'user') {
                    reject({ status: 400, message: 'BadRequest' });
                }

                USER.findById(data.sub).select('email name lastname role').then((user: any) => {

                    if (!user) reject({ status: 401, message: 'TokenExpired' });

                    const { token, expire_token } = create_token(user, 'user');

                    resolve({
                        access_token: token,
                        refresh_token: create_refresh_token(user),
                        expires_in: expire_token
                    });

                }).catch((err: any) => {
                    reject({ status: 401, message: 'TokenExpired' });
                });
            });
        }
        reject({ status: 400, message: 'BadRequest' });
    });
}

/**
 * Verifica el token y el tipo de token
 * @param token JSON Web Token
 * @returns Información del usuario verificado.
 */
function confirm_token(token: string) {
    return new Promise((resolve, reject) => {

        if (token) {
            jwt.verify(token, config.jwt.secret_token, (err: any, data: any) => {

                if (err) reject({ status: 401, message: 'TokenExpired' });

                if (data.type_token !== 'user') reject({ status: 400, message: 'BadRequest' });

                USER.findById(data.sub).select('email role').then((user: any) => {

                    if (!user) reject({ status: 401, message: 'TokenExpired' });
                    resolve(user);

                }).catch((err: any) => {
                    reject({ status: 401, message: 'TokenExpired' });
                });
            });
        } else {
            reject({ status: 400, message: 'BadRequest' });
        }
    });
}

/**
 * Verificar token de confirmación de cuenta.
 * @param token JSON Web Token
 * @returns Información del usuario verificado.
 */
function confirm_token_new_account(token: string) {
    return new Promise((resolve, reject) => {

        if (token) {
            jwt.verify(token, config.jwt.secret_token, (err: any, data: any) => {

                if (err) reject({ status: 401, message: 'TokenExpired' });

                if (data.type_token != 'verify_account') {
                    reject({ status: 400, message: 'BadRequest' });
                }

                USER.findById(data.sub).select('verified').then((user: any) => {

                    if (!user) reject({ status: 401, message: 'TokenExpired' });
                    if (user.verified) reject({ status: 401, message: 'User verified' });

                    resolve(user);

                }).catch((err: any) => {
                    reject({ status: 401, message: 'TokenExpired', result: err });
                });
            });
        } else {
            reject({ status: 400, message: 'BadRequest' });
        }
    });
}
