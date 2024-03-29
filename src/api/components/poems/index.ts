'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './poems-validation';
import poems from './poems-controller';
import * as auth from '../../middlewares/auth';

class RouterPoem {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/', validate_common.get_all, poems.get_all)
            .get('/search/:search', validate_common.search, poems.search)
            .get('/random', poems.random)
            .get('/author/:id', poems.get_all_poems_of_author, poems.get_all_poems_of_author)
            .get('/:id', validate_common.get_by_id, poems.get_by_id)
            .post('/', csrf, auth.user, validation.create, poems.create)
            .patch('/:id', csrf, auth.user, validation.update, poems.update)
            .delete('/:id', csrf,  auth.user, poems.delete_by_id);
    }
}

export default new RouterPoem();