'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import * as regex from '../../utils/regex';
import { logger_users } from '../../helpers/logger';

class UsersValidation {

    public async update(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string(),
            lastname: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().regex(regex.password)
        });

        const data = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => {
                logger_users.info({ err }, 'validation');
                return res.status(400).json(err);
            });
    }
}

export default new UsersValidation();