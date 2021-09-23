'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class BooksValidation {

    async create(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            author: Joi.string().hex().required(),
            title: Joi.string().required(),
            literary_genre: Joi.string().hex().required(),
            editorial: Joi.string().hex().required()
        });

        const data = {
            author: req.body.author,
            title: req.body.title,
            literary_genre: req.body.literary_genre,
            editorial: req.body.editorial
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err))
    }
}
export default new BooksValidation();