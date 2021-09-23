'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import validation from './editorials-validation';
import editorials from './editorials-controller';
import * as auth from '../../middlewares/auth';

class RouterOcup {

    private router: Router = express.Router();

    public routes(): Router {
        this.router.get('/', editorials.get_all)
        this.router.get('/:id', validate_common.get_by_id, editorials.get_with_id)
        this.router.post('/', auth.user, validation.create, editorials.create)
        return this.router;
    }
}

export default new RouterOcup();