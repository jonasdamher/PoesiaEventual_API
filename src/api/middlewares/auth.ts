'use strict';

import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import config from '../config';
import USER, { User } from '../components/users/users-model';
import { JwtPayload } from 'jsonwebtoken';

passport.use(
    'user',
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret_token,
    }, async (payload: JwtPayload, done: VerifiedCallback) => {
        try {

            const user: User = await USER.findOne({ _id: payload.sub, role: payload.role }).select('_id');

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