'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class OccupationsValidator {

    public async create(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
        });

        const data = {
            name: req.body.name,
            description: req.body.description,
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }

    public async update(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            id: Joi.string().hex().required(),
            name: Joi.string().required(),
            description: Joi.string(),
        });

        const data = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => {
                // logger_editorials.info({ err }, 'validation')
                return res.status(400).json(err)
            })

    }

}

export default new OccupationsValidator();