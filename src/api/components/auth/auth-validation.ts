'use strict';

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import * as regex from '../../utils/regex';
import { logger_users } from '../../helpers/logger';

/**
 * Para validar la información de las peticiones antes de 
 * pasarlos antes de enviarlos a los métodos del controlador de servicios
 */
class AuthValidation {

    public async login(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const data = {
            email: req.body.email,
            password: req.body.password
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => {
                logger_users.info({ err }, 'validation')
                return res.status(400).json(err)
            })
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(regex.password).required()
        });

        const data = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        }

        schema.validateAsync(data)
            .then(() => next())
            .catch((err: Error) => {
                logger_users.info({ err }, 'validation')
                return res.status(400).json(err)
            })
    }

}

export default new AuthValidation();