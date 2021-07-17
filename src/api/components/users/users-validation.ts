'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import * as regex from '../../utils/regex';
import { logger_users } from '../../helpers/logger';

export {
    get_by_id,
    login,
    create,
    update
}

async function get_by_id(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        id: Joi.string().hex().required()
    });

    const param = { id: req.params.id };

    schema.validateAsync(param)
        .then(() => next())
        .catch((err: Error) => {
            logger_users.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}

async function login(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const data = {
        email: req.body.email,
        password: req.body.password
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => {
            logger_users.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}

async function create(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(regex.password).required()
    });

    const data = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => {
            logger_users.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}

async function update(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        id: Joi.string().hex().required(),
        name: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().regex(regex.password)
    });

    const data = {
        id: req.params.id,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => {
            logger_users.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}
