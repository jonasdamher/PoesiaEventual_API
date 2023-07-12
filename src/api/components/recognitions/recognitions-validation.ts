'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class RecognitionsValidation {
    public async create(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            title: Joi.string().required(),
            age: Joi.number(),
            text: Joi.string().required(),
            author: Joi.string().hex().required()
        });

        const data = {
            title: req.body.title,
            age: req.body.age,
            text: req.body.text,
            author: req.body.author
        };

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err));
    }

    public async update(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            id: Joi.string().hex().required(),
            title: Joi.string(),
            age: Joi.number(),
            text: Joi.string(),
            author: Joi.string().hex()
        });

        const data = {
            id: req.params.id,
            title: req.body.title,
            age: req.body.age,
            text: req.body.text,
            author: req.body.author
        };

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err));
    }

}

export default new RecognitionsValidation();