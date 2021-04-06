'use strict';

const dotenv = require('dotenv')
dotenv.config()

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const USER = require('../models/user-model')

/**
 * Access for role: ROLE_ADMIN
 */
passport.use('admin', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN,
}, async (payload, done) => {

    try {

        const user = await USER.findOne({
            _id: payload.id,
            role: "ROLE_ADMIN"
        })

        if (!user) {
            return done(null, false)
        }

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

const authAdmin = passport.authenticate('admin', {
    session: false
})

module.exports = { authAdmin }