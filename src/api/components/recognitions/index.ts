'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import * as validation from './recognitions-validation';
import recognitions from './recognitions-controller';
import * as auth from '../../middlewares/auth';

class RouterRecog {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            .get('/', validate_common.get_all, recognitions.get_all)
            .get('/:id', validate_common.get_by_id, recognitions.get_by_id)
            .get('/search/:search', validate_common.search, recognitions.search)
            .post('/', auth.user, validation.create, recognitions.create);
    }
}

export default new RouterRecog();