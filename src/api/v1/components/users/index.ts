'use strict';

import express from 'express';
import * as user from './user-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.post('/auth/login', user.login)
router.post('/auth/signup', user.signup)
router.post('/auth/refresh-token', auth.authAdmin, user.refresh_token)
router.patch('/:id', auth.authAdmin, user.update)

export default router;