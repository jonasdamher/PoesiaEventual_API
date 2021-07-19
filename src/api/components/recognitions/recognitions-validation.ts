'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export {
    create
}

async function create(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        title: Joi.string().required(),
    });

    const data = {
        title: req.body.title,
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}