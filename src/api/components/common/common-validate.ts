'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class CommonValidation {

    public async get_all(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            page: Joi.number().integer(),
            perPage: Joi.number().integer().min(1).max(12)
        });

        const data = {
            page: req.query.page,
            perPage: req.query.perPage
        };

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err));
    }

    public async get_by_id(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            id: Joi.string().hex().required()
        });

        const param = { id: req.params.id };

        schema.validateAsync(param)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err));
    }

    public async search(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            search: Joi.string().required(),
            page: Joi.number().integer(),
            perPage: Joi.number().integer().min(1).max(10)
        });

        const data = {
            search: req.params.search,
            page: req.query.page,
            perPage: req.query.perPage
        };

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => res.status(400).json(err));
    }
}
export default new CommonValidation();