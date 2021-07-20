'use strict';

import express, { Router } from 'express';

import * as validate_common from '../common/common-validate';
import validation from './books-validation';
import books from './books-controller';
import * as auth from '../../middlewares/auth';

class RouterBooks {

    private router: Router = express.Router();

    public routes(): Router {
        this.router.get('/', validate_common.get_all, books.get_all)
        this.router.get('/:id', validate_common.get_by_id, books.get_by_id)
        this.router.get('/search/:search', validate_common.search, books.search)
        this.router.post('/', auth.user, validation.create, books.create)
        return this.router;
    }

}

export default new RouterBooks();