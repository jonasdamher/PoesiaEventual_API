'use strict';

import express from 'express';
import * as validation from './recognitions-validation';
import * as recognitions from './recognitions-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/', validation.getAll, recognitions.getAll)
router.get('/:id', validation.getWithId, recognitions.getWithId)
router.get('/search/:search', validation.search, recognitions.search)
router.post('/', auth.user, validation.create, recognitions.create)

export default router;