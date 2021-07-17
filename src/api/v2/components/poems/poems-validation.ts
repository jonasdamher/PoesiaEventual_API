'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export {
    get_all,
    get_all_poems_of_author,
    get_by_id,
    search,
    create
}

async function get_all(req: Request, res: Response, next: NextFunction) {

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

async function get_all_poems_of_author(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        id: Joi.string().hex().required(),
        page: Joi.number().integer(),
        perpage: Joi.number().integer().min(1).max(10)
    });

    const data = {
        id: req.params.id,
        page: req.query.page,
        perpage: req.query.perpage
    }
    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => {
            return res.status(400).json(err)
        })
}

async function get_by_id(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        id: Joi.string().hex().required()
    });

    const param = { id: req.params.id };

    schema.validateAsync(param)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}

async function search(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        search: Joi.string().required(),
        page: Joi.number().integer(),
        perpage: Joi.number().integer().min(1).max(10)
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
