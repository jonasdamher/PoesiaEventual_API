'use strict';

import express from 'express';
import * as validation from './genres-validation';
import * as author from './genres-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', author.get_all)
router.get('/:id', validation.get_with_id, author.get_with_id)
router.post('/', auth.user, validation.create, author.create)

export default router;