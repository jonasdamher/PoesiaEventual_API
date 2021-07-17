'use strict';

import express from 'express';
import * as validation from './poems-validation';
import * as poems from './poems-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', validation.get_all, poems.get_all);
router.get('/author/:id', poems.get_all_poems_of_author, poems.get_all_poems_of_author);
router.get('/:id', validation.get_by_id, poems.get_by_id);
router.get('/search/:search', validation.search, poems.search);
router.get('/random', poems.random);
router.post('/', auth.user, validation.create, poems.create);

export default router;