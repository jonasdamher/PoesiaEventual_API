'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './books-validation';
import books from './books-controller';
import * as auth from '../../middlewares/auth';

class RouterBooks {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/', validate_common.get_all, books.get_all)
            .get('/:id', validate_common.get_by_id, books.get_by_id)
            .get('/search/:search', validate_common.search, books.search)
            .post('/', csrf, auth.user, validation.create, books.create)
            .patch('/:id', csrf, auth.user, validation.update, books.update)
            .delete('/:id', csrf, auth.user, books.delete_by_id);
    }

}

export default new RouterBooks();