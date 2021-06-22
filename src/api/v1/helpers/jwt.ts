'use strict';

import JWT from 'jsonwebtoken';
import moment from 'moment';

import config from '../config';
import USER from '../components/users/user-model';

export {
    create_token,
    create_refresh_token,
    refresh_token
}

async function create_token(user: any) {

    const exp_token = moment().add(7, 'days').unix();
    const token = JWT.sign({
        id: user.id,
        sub: user._id,
        role: user.role,
        iat: moment().unix(),
        exp: exp_token,
    }, config.jwt.secret_token);

    return {
        access_token: token,
        expire: exp_token
    }
}

async function create_refresh_token(user: any) {
    return JWT.sign({
        id: user.id,
        sub: user._id,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    }, config.jwt.refresh_token)
}

async function refresh_token(data: any) {
    return new Promise((resolve, reject) => {
        if (data.refresh_token && data.grant_type === 'refresh_token') {

            JWT.verify(data.refresh_token, config.jwt.refresh_token, (err: any, data: any) => {

                if (err) {
                    reject({
                        error: "TokenExpired"
                    })
                }

                USER.findOne({ _id: data.sub }).then(async (user: any) => {

                    if (!user) {
                        reject({
                            error: "TokenExpired"
                        })
                    }

                    let token = await create_token(user);

                    const data_token = {
                        access_token: token.access_token,
                        refresh_token: await create_refresh_token(user),
                        expires_in: token.expire,
                        role: user.role
                    }

                    resolve(data_token);

                }).catch((err: any) => {
                    reject({
                        error: "TokenExpired"
                    })
                })

            })

        } else {
            reject({
                error: "BadRequest"
            });
        }
    })
}
