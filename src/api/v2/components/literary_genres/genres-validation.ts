'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export {
    get_with_id,
    create
}

async function get_with_id(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        id: Joi.string().hex().required()
    });

    const param = { id: req.params.id };

    schema.validateAsync(param)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}

async function create(req: Request, res: Response, next: NextFunction) {
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
