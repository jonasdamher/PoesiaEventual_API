'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import * as regex from '../../utils/regex';
import { logger_authors } from '../../helpers/logger';

class AuthorValidation {


    async get_by_name(req: Request, res: Response, next: NextFunction) {

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

    async create(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            personal: {
                name: Joi.string().required(),
                lastname: Joi.string().required(),
            },
            full_name: Joi.string(),
            pseudonym: Joi.string(),
            gender: Joi.string().required(),
            country: Joi.string().hex(),
            short_description: Joi.string().max(155).required(),
            biography: Joi.string().max(700).required(),
            portrait: Joi.string(),
            description: Joi.string().max(155),
        });

        const data = {
            personal: {
                name: req.body.personal.name,
                lastname: req.body.personal.lastname,
            },
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
}
export default new AuthorValidation();
