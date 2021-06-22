'use strict';

// Modelos
import USER, { User } from './user-model';
// Ayudantes
import * as authJWT from '../../helpers/jwt';
import response_data from '../../helpers/response_data';
// Tipos
import Response_data from '../../types/Response_data';

export {
    login,
    signup,
    refresh_token,
    update
}

function login(email: string, password: string): Promise<Response_data> {
    return new Promise(async (resolve, reject) => {

        const response = response_data();

        USER.findOne({ email: email })
            .select("_id password role name email")
            .then((user: any) => {

                if (!user) {
                    response.status = 404;
                    response.message = "User does not exist";
                    reject(response);
                }

                user.comparePassword(password).then(async (ok: any) => {
                    let dataToken = await authJWT.create_token(user);

                    let userResponse = {
                        access_token: dataToken.access_token,
                        refresh_token: authJWT.create_refresh_token(user),
                        expires_in: dataToken.expire,
                        role: user.role,
                        user: {
                            name: user.name,
                            email: user.email,
                            _id: user.id
                        }
                    };

                    response.data = userResponse;
                    response.is_valid = true;
                    resolve(response);

                }).catch((err: any) => {
                    response.status = 401;
                    response.message = "Password or Email Invalid";
                    reject(response)
                })
            }).catch((err: any) => {
                response.status = 401;
                response.message = "Password or Email Invalid";
                reject(response);
            });
    });
}

function signup(data_body: any): Promise<Response_data> {
    return new Promise(async (resolve, reject) => {
        const response = response_data();

        const user: User = new USER(data_body);

        user.save().then(async (user: any) => {

            let dataToken = await authJWT.create_token(user);

            let userResponse = {
                access_token: dataToken.access_token,
                refresh_token: authJWT.create_refresh_token(user),
                expires_in: dataToken.expire,
                role: user.role,
                user: {
                    name: user.name,
                    email: user.email,
                    _id: user.id
                }
            };

            response.status = 201;
            response.data = userResponse;
            resolve(response);

        }).catch((err: any) => {
            response.status = 400;
            response.message = "BadRequest";
            reject(response);
        });
    });
}

function refresh_token(data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {
        const response = response_data();

        authJWT.refresh_token(data).then((token: any) => {
            response.data = token;
            response.is_valid = true;
            resolve(response);

        }).catch((err: any) => {
            response.data = err;
            response.status = 400;
            reject(response);
        });
    })
}

function update(id: string, data: any): Promise<Response_data> {
    return new Promise((resolve, reject) => {
        const response = response_data();

        USER.findByIdAndUpdate(id, data, { new: true }).then((userResponse: any) => {

            response.data = userResponse;
            response.is_valid = true;
            resolve(response);
        }).catch((err: any) => {

            response.data = err;
            response.status = 400;
            reject(response);
        })
    })
}