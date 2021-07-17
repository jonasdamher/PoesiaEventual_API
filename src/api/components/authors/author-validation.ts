'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import * as regex from '../../utils/regex';
import { logger_authors } from '../../helpers/logger';

export {
    get_all,
    get_by_id,
    get_by_name,
    search,
    create
}

async function get_all(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        page: Joi.number().integer(),
        perpage: Joi.number().integer().min(1).max(10)
    });

    const data = {
        page: req.query.page,
        perpage: req.query.perpage
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => {
            logger_authors.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}

async function get_by_id(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        id: Joi.string().hex().required()
    });

    const param = { id: req.params.id };

    schema.validateAsync(param)
        .then(() => next())
        .catch((err: Error) => {
            logger_authors.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}

async function get_by_name(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        name: Joi.string().regex(regex.url_name).required()
    });

    const param = { name: req.params.name };

    schema.validateAsync(param)
        .then(() => next())
        .catch((err: Error) => {
            logger_authors.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}
async function search(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        search: Joi.string().required(),
        page: Joi.number().integer(),
        perpage: Joi.number().integer().min(1).max(10)
    });

    const data = {
        search: req.params.search,
        page: req.query.page,
        perpage: req.query.perpage
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => {
            logger_authors.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}

async function create(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        full_name: Joi.string(),
        pseudonym: Joi.string(),
        gender: Joi.string().required(),
        country: Joi.string().hex().required(),
        short_description: Joi.string().max(155).required(),
        biography: Joi.string().max(700).required(),
        portrait: Joi.string().required(),
        description: Joi.string().max(155).required(),
    });

    const data = {
        name: req.body.personal.name,
        lastname: req.body.personal.lastname,
        full_name: req.body.personal.full_name,
        pseudonym: req.body.personal.pseudonym,
        gender: req.body.personal.gender,
        country: req.body.personal.country,
        short_description: req.body.short_description,
        biography: req.body.biography,
        portrait: req.body.portrait,
        description: req.body.meta.description,
    };

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => {
            logger_authors.info({ err }, 'validation')
            return res.status(400).json(err)
        })
}
