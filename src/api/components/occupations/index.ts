'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './occupations-validation';
import occupations from './occupations-controller';
import * as auth from '../../middlewares/auth';

class RouterOcup {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/', occupations.get_all)
            .get('/:id', validate_common.get_by_id, occupations.get_with_id)
            .post('/', csrf, auth.user, validation.create, occupations.create)
            .patch('/:id', csrf, auth.user, validation.update, occupations.update);
    }
}

export default new RouterOcup();