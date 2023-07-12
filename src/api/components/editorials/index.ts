'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './editorials-validation';
import editorials from './editorials-controller';
import * as auth from '../../middlewares/auth';

class RouterEditorial {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/', editorials.get_all)
            .get('/:id', validate_common.get_by_id, editorials.get_with_id)
            .post('/', csrf, auth.user, validation.create, editorials.create)
            .patch('/:id', csrf, auth.user, validation.update, editorials.update);
    }
}

export default new RouterEditorial();