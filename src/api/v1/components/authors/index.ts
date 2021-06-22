import express from 'express';

import * as author from './author-controller';
import * as auth from '../../middlewares/auth';

const router = express.Router()

router.get('/get/:id', author.getWithId)
router.get('/search/:search', author.searchAuthor)
router.get('/random', author.random)
router.get('/poems/:id', author.getPoemsList)

router.post('/create', auth.authAdmin, author.create)
router.patch('/update/:id', auth.authAdmin, author.update)

export default router;