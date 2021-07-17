'use strict';

import express from 'express';
import * as validation from './editorials-validation';
import * as editorials from './editorials-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', editorials.get_all)
router.get('/:id', validation.get_with_id, editorials.get_with_id)
router.post('/', auth.user, validation.create, editorials.create)

export default router;