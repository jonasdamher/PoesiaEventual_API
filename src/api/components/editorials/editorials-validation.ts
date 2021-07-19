'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export {
    create
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
