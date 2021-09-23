'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import * as validation from './recognitions-validation';
import recognitions from './recognitions-controller';
import * as auth from '../../middlewares/auth';

class RouterRecog {

    private router: Router = express.Router();

    public routes(): Router {

        this.router.get('/', validate_common.get_all, recognitions.get_all);
        this.router.get('/:id', validate_common.get_by_id, recognitions.get_by_id);
        this.router.get('/search/:search', validate_common.search, recognitions.search);
        this.router.post('/', auth.user, validation.create, recognitions.create);
        return this.router;
    }
}

export default new RouterRecog();