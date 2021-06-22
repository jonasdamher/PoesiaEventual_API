'use strict';

import { Model, model, Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import * as regex from '../../helpers/regex';

enum roles {
    "ROLE_ADMIN"
}

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: roles;
}

interface user_model extends Model<User> { }

const user_schema: Schema<User, user_model> = new Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        match: regex.email,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        match: regex.password,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: [
            "ROLE_ADMIN"
        ],
        required: true
    }
})

const generateHashPassword = (plainPassword: string) => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))
}

user_schema.pre('save', function (this:User,next:any) {
    try {

        let user = this

        if (!user.isModified('password')) {
            return next()
        }

        user.password = generateHashPassword(user.password)
        next()

    } catch (error: any) {

        next(error)
    }
})

user_schema.methods.comparePassword = function (candidatePassword: string) {
    return new Promise((resolve, reject) => {

    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (!isMatch) {
            reject(false);
        }
        resolve(isMatch);

    })  });
}

export default model('users', user_schema)