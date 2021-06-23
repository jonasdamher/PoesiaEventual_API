'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export {
    getWithId,
    searchAuthor,
    getPoemsList
}

async function getWithId(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        id: Joi.string().hex().required()
    });

    const param = {id:req.params.id};

    schema.validateAsync(param)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}

async function searchAuthor(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        search: Joi.string().required(),
        page: Joi.number().integer(),
        perpage: Joi.number().integer()
    });

    const data = {
        search: req.params.search,
        page: req.query.page,
        perpage: req.query.perpage
    }

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}

async function getPoemsList(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        id: Joi.string().hex().required(),
        page: Joi.number().integer(),
        perpage: Joi.number().integer()
    });

    const data = {
        id: req.params.id,
        page: req.query.page,
        perpage: req.query.perpage
    }
    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}
