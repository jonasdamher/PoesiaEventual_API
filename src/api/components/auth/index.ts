'use strict';

import csrf from '../../utils/csrf';

import express, { Router, Request, Response } from 'express';
import validation from './auth-validation';
import Auth from './auth-controller';

class RouterAuth {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            // .post('/', csrf, validation.create, Auth.create)
            .post('/login', csrf, validation.login, Auth.login)
            // .get('/confirm_account/:token', Auth.confirmAccount)
            .get('/csrf', csrf, (req: Request, res: Response) => {
                return res.json({ csrfToken: req.csrfToken() })
            })
    }
}

export default new RouterAuth();