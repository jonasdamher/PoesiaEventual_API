'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validation from './users-validation';

import Users from './users-controller';
import * as auth from '../../middlewares/auth';

class RouterUsers {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            .get('/', auth.user, Users.getById)
            .patch('/update', csrf, auth.user, validation.update, Users.update)
            .delete('/delete', auth.user, Users.delete);
    }
}

export default new RouterUsers();