'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './author-validation';
import author from './author-controller';
import * as auth from '../../middlewares/auth';

/**
 * Rutas
 */
class RouterAuthor {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/random', author.random)
            .get('/search/:search', validate_common.search, author.search)
            .get('/name/:name', validation.get_by_name, author.get_by_name)
            .get('/', validate_common.get_all, author.get_all)
            .get('/:id', validate_common.get_by_id, author.get_by_id)
            .post('/', csrf, auth.user, validation.create, author.create)
            .patch('/:id', csrf, auth.user, validation.update, author.update)
            .delete('/:id', auth.user, author.delete_by_id);
    }
}

export default new RouterAuthor();