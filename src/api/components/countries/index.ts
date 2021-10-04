'use strict';

import express, { Router } from 'express';
import * as validate_common from '../common/common-validate';
import validation from './countries-validation';
import countries from './countries-controller';
import * as auth from '../../middlewares/auth';

class RouterCountries {

    private router: Router = express.Router();

    public routes(): Router {
        return this.router
            .get('/', validate_common.get_all, countries.getAll)
            .get('/:id', validate_common.get_by_id, countries.getWithId)
            .post('/', auth.user, validation.create, countries.create);
    }
}

export default new RouterCountries();