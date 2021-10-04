'use strict';

import express, { Router } from 'express';
import validate_common from '../common/common-validate';
import validation from './users-validation';
import Users from './users-controller';
import * as auth from '../../middlewares/auth';

class RouterUsers {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            .get('/', auth.user, Users.getById)
            .post('/', validation.create, Users.create)
            .post('/login', validation.login, Users.login)
            .get('/confirm_account/:token', Users.confirmAccount)
            .patch('/update/:id', auth.user, validation.update, Users.update);

    }
}

export default new RouterUsers();