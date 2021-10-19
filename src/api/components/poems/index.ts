'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './poems-validation';
import poems from './poems-controller';
import * as auth from '../../middlewares/auth';

class RouterPoem {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            .get('/', validate_common.get_all, poems.get_all)
            .get('/author/:id', poems.get_all_poems_of_author, poems.get_all_poems_of_author)
            .get('/:id', validate_common.get_by_id, poems.get_by_id)
            .get('/search/:search', validate_common.search, poems.search)
            .get('/random', poems.random)
            .post('/', csrf, auth.user, validation.create, poems.create);
    }
}

export default new RouterPoem();