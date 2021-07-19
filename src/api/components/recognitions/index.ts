'use strict';

import express from 'express';
import * as validate_common from '../common/common-validate';
import * as validation from './recognitions-validation';
import * as recognitions from './recognitions-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', validate_common.get_all, recognitions.getAll)
router.get('/:id', validate_common.get_by_id, recognitions.getWithId)
router.get('/search/:search', validate_common.search, recognitions.search)
router.post('/', auth.user, validation.create, recognitions.create)

export default router;