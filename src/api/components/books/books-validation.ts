'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class BooksValidation {

    public async create(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            author: Joi.string().hex().required(),
            title: Joi.string().required(),
            synopsis: Joi.string(),
            published: Joi.number(),
            literary_genre: Joi.string().hex().required(),
            editorial: Joi.string().hex().required()
        });

        const data = {
            author: req.body.author,
            title: req.body.title,
            synopsis: req.body.synopsis,
            published: req.body.published,
            literary_genre: req.body.literary_genre,
            editorial: req.body.editorial
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }

    public async update(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            id: Joi.string().hex().required(),
            author: Joi.string().hex(),
            title: Joi.string(),
            synopsis: Joi.string(),
            published: Joi.number(),
            literary_genre: Joi.string().hex(),
            editorial: Joi.string().hex()
        });

        const data = {
            id: req.params.id,
            author: req.body.author,
            title: req.body.title,
            synopsis: req.body.synopsis,
            published: req.body.published,
            literary_genre: req.body.literary_genre,
            editorial: req.body.editorial
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }
}
export default new BooksValidation();