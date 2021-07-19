'use strict';

import express from 'express';
import * as validate_common from '../common/common-validate';
import * as validation from './books-validation';
import * as books from './books-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', validate_common.get_all, books.get_all)
router.get('/:id', validate_common.get_by_id, books.get_by_id)
router.get('/search/:search', validate_common.search, books.search)
router.post('/', auth.user, validation.create, books.create)

export default router;