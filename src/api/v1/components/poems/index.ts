'use strict';

import express from 'express';
import * as auth from '../../middlewares/auth';
import * as poems from './poem-controller';

const router = express.Router()

router.get('/get/:id', poems.getWithId)
router.get('/search/:search', poems.searchPoem)
router.get('/random', poems.random)
router.post('/create', auth.authAdmin, poems.create)
router.patch('/update/:id', auth.authAdmin, poems.update)

export default router;