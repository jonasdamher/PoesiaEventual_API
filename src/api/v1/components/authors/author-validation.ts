'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export {
    getWithId,
    searchAuthor,
    getPoemsList,
    create,
    update
}

async function getWithId(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        id: Joi.string().hex().required()
    });

    const id = req.params.id;

    schema.validateAsync(id)
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

async function create(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        name: Joi.string().required()
    });

    const body = req.body.name;

    schema.validateAsync(body)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}

async function update(req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object({
        id: Joi.string().hex().required(),
        name: Joi.string().required()
    });

    const data = {
        id: req.params.id,
        name: req.body.name
    };

    schema.validateAsync(data)
        .then(() => next())
        .catch((err: Error) => res.status(400).json(err))
}
