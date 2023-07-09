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
            name: Joi.string().required(),
            lastname: Joi.string().required(),
            full_name: Joi.string(),
            pseudonym: Joi.string(),
            gender: Joi.string().required(),
            country: Joi.string().hex(),
            short_description: Joi.string().max(300).required(),
            biography: Joi.string().max(1200).required(),
            portrait: Joi.string(),
            description: Joi.string().max(250),
        });

        const data = {
            name: req.body.name,
            lastname: req.body.lastname,
            full_name: req.body.full_name,
            pseudonym: req.body.pseudonym,
            gender: req.body.gender,
            country: req.body.country,
            short_description: req.body.short_description,
            biography: req.body.biography,
            portrait: req.body.portrait,
            description: req.body.description,
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
