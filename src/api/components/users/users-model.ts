'use strict';

import moment from 'moment';
import bcrypt from 'bcrypt';
import { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';
import { logger_users } from '../../helpers/logger';

enum roles {
    'ROLE_ADMIN',
    'ROLE_BASIC'
}

export interface User extends Document {
    name: string;
    lastname: string;
    email: string;
    password: string;
    role?: roles;
    verified?: boolean;
    expire_at: Date;
    createdAt: number;
    updatedAt: number;

    compare_password(password: string): Promise<any>;
}

const user_schema: Schema<User> = new Schema({
    name: {
        type: String,
        trim: true,
        validate: {
            validator: (v: any) => {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
    },
    lastname: {
        type: String,
        trim: true,
        validate: {
            validator: (v: any) => {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v: any) => {
                return regex.email.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        immutable: true,
        unique: true,
        required: [true, 'Es obligatorio introducir un nombre.'],
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        validate: {
            validator: (v: any) => {
                return regex.password.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado, al menos 1 mayuscula, 1 numero y 1 simbolo especial.`
        },
        required: [true, 'Es obligatorio introducir una contraseña.'],
    },
    role: {
        type: String,
        enum: [roles.ROLE_ADMIN, roles.ROLE_BASIC],
        required: true
    },
    expire_at: {
        type: Date,
        default: Date.now,
        // (1440m) 24 horas para que expire el documento y se 
        // elimine si no se confirma la cuenta por correo electrónico.
        index: { expires: '1440m' }
    },
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
});

user_schema.pre<User>('save', function (this: User, next: any) {

    if (!this.isModified('password')) return next();

    const salt = 12;
    bcrypt.hash(this.password, salt, (err: any, hash: string) => {

        if (err) {
            logger_users.info({ err }, 'model');
        }
        this.password = hash;
        next();
    });
});

user_schema.methods.compare_password = async function (password: string): Promise<any> {
    return new Promise((resolve, reject) => {

        bcrypt.compare(password, this.password, (err: any, match: boolean) => {
            if (!match) {
                reject(match);
            }
            resolve(match);
        });
    });
};

const USER: Model<User> = model('users', user_schema);
export default USER;