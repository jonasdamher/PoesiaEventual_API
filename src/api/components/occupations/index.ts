'use strict';

import express from 'express';
import * as validation from './occupations-validation';
import * as occupations from './occupations-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', occupations.get_all)
router.get('/:id', validation.get_with_id, occupations.get_with_id)
router.post('/', auth.user, validation.create, occupations.create)

export default router;