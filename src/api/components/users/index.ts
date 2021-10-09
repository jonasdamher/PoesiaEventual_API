'use strict';

import express, { Router } from 'express';
import csrf from '../../utils/csrf';
import validation from './users-validation';
import Users from './users-controller';
import * as auth from '../../middlewares/auth';

class RouterUsers {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            .get('/', auth.user, Users.getById)
            .patch('/update/:id', csrf, auth.user, validation.update, Users.update);
    }
}

export default new RouterUsers();