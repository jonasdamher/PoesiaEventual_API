'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './recognitions-validation';
import recognitions from './recognitions-controller';
import * as auth from '../../middlewares/auth';

class RouterRecog {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/', validate_common.get_all, recognitions.get_all)
            .get('/:id', validate_common.get_by_id, recognitions.get_by_id)
            .get('/search/:search', validate_common.search, recognitions.search)
            .post('/', csrf, auth.user, validation.create, recognitions.create)
            .patch('/:id', csrf, auth.user, validation.update, recognitions.update)
            .delete('/:id', auth.user, recognitions.delete_by_id);
     }
}

export default new RouterRecog();