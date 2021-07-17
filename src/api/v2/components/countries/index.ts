'use strict';

import express from 'express';
import * as validation from './countries-validation';
import * as recognitions from './countries-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', validation.getAll, recognitions.getAll)
router.get('/:id', validation.getWithId, recognitions.getWithId)
router.post('/', auth.user, validation.create, recognitions.create)

export default router;