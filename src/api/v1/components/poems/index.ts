'use strict';

import express from 'express';
import * as validation from './poem-validation';
import * as poems from './poem-controller';

const router = express.Router()

router.get('/', validation.getAll, poems.getAll)
router.get('/get/:id', validation.getWithId, poems.getWithId)
router.get('/search/:search', validation.searchPoem, poems.searchPoem)
router.get('/random', poems.random)

export default router;