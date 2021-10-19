'use strict';

import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import config from '../config';
import USER from '../components/users/users-model';

passport.use(
    'user',
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret_token,
    }, async (payload: any, done: VerifiedCallback) => {
        try {

            const user = await USER.findOne({ _id: payload.sub, role: payload.role }).select('_id');

            if (!user) return done(null, false);
            done(null, user);

        } catch (error) {
            done(error, false);
        }
    })
);

const user = passport.authenticate('user', { session: false });

export {
    user
};