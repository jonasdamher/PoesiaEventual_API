'use strict';

import express from 'express';
import * as validation from './users-validation';
import * as users from './users-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', auth.user, validation.get_by_id, users.get_by_id);
router.patch('/update/:id', auth.user, validation.update, users.update);
router.post('/', validation.create, users.create);
router.post('/login', validation.login, users.login);
router.get('/confirm_account/:token', users.confirm_account);

export default router;