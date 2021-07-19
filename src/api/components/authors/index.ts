'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import validation from './author-validation';
import author from './author-controller';
import * as auth from '../../middlewares/auth';

class RouterAuthor {

    private router: Router = express.Router();

    public routes(): Router {

        this.router.get('/random', author.random);
        this.router.get('/search/:search', validate_common.search, author.search);

        this.router.get('/', validate_common.get_all, author.get_all);
        this.router.get('/:id', validate_common.get_by_id, author.get_by_id);
        this.router.get('/name/:name', validation.get_by_name, author.get_by_name);

        this.router.post('/', auth.user, validation.create, author.create);
        this.router.patch('/:id', auth.user, author.update);

        return this.router;
    }
}

export default new RouterAuthor();