'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export {
    getAll,
    getWithId,
    create
}

async function getAll(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        page: Joi.number().integer(),
        perpage: Joi.number().integer().min(1).max(10)
    });

    const data = {
        page: req.query.page,
        perpage: req.query.perpage
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}

async function getWithId(req: Request, res: Response, next: NextFunction) {

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