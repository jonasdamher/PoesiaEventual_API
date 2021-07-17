'use strict';

import express from 'express';
import * as validation from './books-validation';
import * as books from './books-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', validation.get_all, books.get_all)
router.get('/:id', validation.get_by_id, books.get_by_id)
router.get('/search/:search', validation.search, books.search)
router.post('/', auth.user, validation.create, books.create)

export default router;