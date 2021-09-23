'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import validation from './genres-validation';
import author from './genres-controller';
import * as auth from '../../middlewares/auth';

class RouterGenres {

    private router: Router = express.Router();

    public routes(): Router {
        this.router.get('/', author.get_all)
        this.router.get('/:id', validate_common.get_by_id, author.get_with_id)
        this.router.post('/', auth.user, validation.create, author.create)

        return this.router;
    }
}

export default new RouterGenres();