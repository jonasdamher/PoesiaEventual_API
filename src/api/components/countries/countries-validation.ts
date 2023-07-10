'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class CountriesValidation {

    public async create(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            name: Joi.string().required(),
            ISO_text: Joi.string().required(),
            ISO_number: Joi.number()
        });

        const data = {
            name: req.body.name,
            ISO_text: req.body.ISO_text,
            ISO_number: req.body.ISO_number,
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }

    public async update(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            id: Joi.string().hex().required(),
            name: Joi.string(),
            ISO_text: Joi.string(),
            ISO_number: Joi.number()
        });

        const data = {
            id: req.params.id,
            name: req.body.name,
            ISO_text: req.body.ISO_text,
            ISO_number: req.body.ISO_number,
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }

}

export default new CountriesValidation();