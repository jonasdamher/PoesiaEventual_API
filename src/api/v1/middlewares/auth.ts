'use strict';

import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../config'
import USER from '../components/users/user-model';

passport.use(
    'admin',
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret_token
    }, async (payload: any, done: any) => {

        if (payload.role === 'ROLE_ADMIN') {

            USER.findById({ _id: payload.id }).then((user: any) => {

                if (!user) {
                    return done(null, false)
                }

                return done(null, user)
            }).catch((error: any) => {
                return done(error, false)
            });

        } else {
            return done(null, false)
        }
    })
);

const authAdmin = passport.authenticate('admin', {
    session: false
})

export { authAdmin }