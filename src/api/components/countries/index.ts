'use strict';

import csrf from '../../utils/csrf';
import express, { Router } from 'express';

import validate_common from '../common/common-validate';
import validation from './countries-validation';
import countries from './countries-controller';
import * as auth from '../../middlewares/auth';

class RouterCountries {

    private router: Router = express.Router({ caseSensitive: true, strict: true });

    public routes(): Router {
        return this.router
            .get('/', validate_common.get_all, countries.getAll)
            .get('/:id', validate_common.get_by_id, countries.getWithId)
            .post('/', csrf, auth.user, validation.create, countries.create)
            .patch('/:id', csrf, auth.user, validation.update, countries.update)
            .delete('/:id', csrf, auth.user, countries.delete_by_id);
    }
}

export default new RouterCountries();