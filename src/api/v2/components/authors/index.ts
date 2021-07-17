'use strict';

import express from 'express';
import * as validation from './author-validation';
import * as author from './author-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router();

router.get('/random', author.random);
router.get('/search/:search', validation.search, author.search);

router.get('/', validation.get_all, author.get_all);
router.get('/:id', validation.get_by_id, author.get_by_id);
router.get('/name/:name', validation.get_by_name, author.get_by_name);

router.post('/', auth.user, validation.create, author.create);
router.patch('/:id', auth.user, author.update);

export default router;