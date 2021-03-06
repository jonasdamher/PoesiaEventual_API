'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './genres-validation';
import author from './genres-controller';
import * as auth from '../../middlewares/auth';

class RouterGenres {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            .get('/', author.get_all)
            .get('/:id', validate_common.get_by_id, author.get_with_id)
            .post('/', csrf, auth.user, validation.create, author.create);
    }
}

export default new RouterGenres();