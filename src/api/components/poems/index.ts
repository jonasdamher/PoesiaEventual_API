'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import  validation from './poems-validation';
import poems from './poems-controller';
import * as auth from '../../middlewares/auth';

class RouterPoem {

    private router: Router = express.Router();

    public routes(): Router {
        this.router.get('/', validate_common.get_all, poems.get_all);
        this.router.get('/author/:id', poems.get_all_poems_of_author, poems.get_all_poems_of_author);
        this.router.get('/:id', validate_common.get_by_id, poems.get_by_id);
        this.router.get('/search/:search', validate_common.search, poems.search);
        this.router.get('/random', poems.random);
        this.router.post('/', auth.user, validation.create, poems.create);

        return this.router;
    }
}

export default new RouterPoem();