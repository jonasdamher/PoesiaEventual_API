'use strict';

import express from 'express';
import * as validate_common from '../common/common-validate';
import * as validation from './editorials-validation';
import * as editorials from './editorials-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', editorials.get_all)
router.get('/:id', validate_common.get_by_id, editorials.get_with_id)
router.post('/', auth.user, validation.create, editorials.create)

export default router;