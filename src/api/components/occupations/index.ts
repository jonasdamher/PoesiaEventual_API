'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import validation from './occupations-validation';
import occupations from './occupations-controller';
import * as auth from '../../middlewares/auth';

class RouterOcup {

    private router: Router = express.Router();

    public routes(): Router {

        this.router.get('/', occupations.get_all)
        this.router.get('/:id', validate_common.get_by_id, occupations.get_with_id)
        this.router.post('/', auth.user, validation.create, occupations.create)

        return this.router;
    }
}

export default new RouterOcup();