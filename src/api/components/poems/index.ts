'use strict';

import express from 'express';
import * as validate_common from '../common/common-validate';
import * as validation from './poems-validation';
import * as poems from './poems-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', validate_common.get_all, poems.get_all);
router.get('/author/:id', poems.get_all_poems_of_author, poems.get_all_poems_of_author);
router.get('/:id', validate_common.get_by_id, poems.get_by_id);
router.get('/search/:search', validate_common.search, poems.search);
router.get('/random', poems.random);
router.post('/', auth.user, validation.create, poems.create);

export default router;