'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './genres-validation';
import genres from './genres-controller';
import * as auth from '../../middlewares/auth';

class RouterGenres {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/', genres.get_all)
            .get('/:id', validate_common.get_by_id, genres.get_with_id)
            .post('/', csrf, auth.user, validation.create, genres.create)
            .patch('/:id', csrf, auth.user, validation.update, genres.update)
            .delete('/:id', csrf, auth.user, genres.delete_by_id);
    }

}

export default new RouterGenres();