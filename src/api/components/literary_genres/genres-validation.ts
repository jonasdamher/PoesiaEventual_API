'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class GenresValidation {

    public async create(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            subgenres: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                })
            ).optional(),
        });

        const data = {
            name: req.body.name,
            description: req.body.description,
            subgenres: req.body.subgenres
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string(),
            description: Joi.string(),
            subgenres: Joi.array().items(
                Joi.object({
                    _id: Joi.string().hex().optional(),
                    name: Joi.string().required(),
                })
            ).optional(),
        });

        const data = {
            name: req.body.name,
            description: req.body.description,
            subgenres: req.body.subgenres
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }



}

export default new GenresValidation();