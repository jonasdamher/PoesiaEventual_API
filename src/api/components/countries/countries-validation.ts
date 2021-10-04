'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class CountriesValidation {

    public async create(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            name: Joi.string().required(),
            language: Joi.string().required(),
            ISO: Joi.number()
        });

        const data = {
            name: req.body.name,
            language: req.body.language,
            ISO: req.body.ISO,
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }
}

export default new CountriesValidation();