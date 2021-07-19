'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import * as validation from './users-validation';
import Users from './Users-controller';
import * as auth from '../../middlewares/auth';

class RouterUsers {

    private router: Router = express.Router();

    public routes(): Router {

        this.router.get('/:id', auth.user, validate_common.get_by_id, Users.get_by_id);
        this.router.patch('/update/:id', auth.user, validation.update, Users.update);
        this.router.post('/', validation.create, Users.create);
        this.router.post('/login', validation.login, Users.login);
        this.router.get('/confirm_account/:token', Users.confirm_account);

        return this.router;
    }
}

export default new RouterUsers();