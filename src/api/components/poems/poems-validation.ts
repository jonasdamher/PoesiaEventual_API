'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class PoemsValidation {

    public async get_all_poems_of_author(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            id: Joi.string().hex().required(),
            page: Joi.number().integer(),
            perpage: Joi.number().integer().min(1).max(12)
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

    public async create(req: Request, res: Response, next: NextFunction) {
        let schema = null;
        let data = {};

        if (req.body.poems) {

            schema = Joi.object({
                poems: Joi.array().items(Joi.object({
                    title: Joi.string().required(),
                    text: Joi.string().required(),
                    author: Joi.string().hex().required(),
                    description: Joi.string().max(250),
                    keywords: Joi.array().items(
                        Joi.object({
                            word: Joi.string().required(),
                        })
                    ).max(25).optional()
                }))
            });

            data = {
                poems: req.body.poems,
            }
        } else {

            schema = Joi.object({
                title: Joi.string().required(),
                text: Joi.string().required(),
                author: Joi.string().hex().required(),
                description: Joi.string().max(250),
                keywords: Joi.array().items(
                    Joi.object({
                        word: Joi.string().required(),
                    })
                ).max(25).optional()
            });

            data = {
                title: req.body.title,
                text: req.body.text,
            }
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        let schema = null;
        let data = {};

        if (req.body.poems) {

            schema = Joi.object({
                poems: Joi.array().items(Joi.object({
                    id: Joi.string().hex().required(),
                    title: Joi.string(),
                    text: Joi.string(),
                    author: Joi.string().hex(),
                    description: Joi.string().max(250),
                    keywords: Joi.array().items(
                        Joi.object({
                            _id: Joi.string().hex().optional(),
                            word: Joi.string().required(),
                        })
                    ).max(25).optional()
                }))
            });

            data = {
                poems: req.body.poems,
            }
        } else {

            schema = Joi.object({
                id: Joi.string().hex().required(),
                title: Joi.string(),
                text: Joi.string(),
                author: Joi.string().hex(),
                description: Joi.string().max(250),
                keywords: Joi.array().items(
                    Joi.object({
                        _id: Joi.string().hex().optional(),
                        word: Joi.string().required(),
                    })
                ).max(25).optional()
            });

            data = {
                title: req.body.title,
                text: req.body.text,
            }
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }
}

export default new PoemsValidation();