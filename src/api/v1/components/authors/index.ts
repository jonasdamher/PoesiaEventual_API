import express from 'express';

import * as auth from '../../middlewares/auth';
import * as validation from './author-validation';
import * as author from './author-controller';

const router = express.Router()

router.get(
    '/get/:id',
    validation.getWithId,
    author.getWithId
)

router.get(
    '/search/:search',
    validation.searchAuthor,
    author.searchAuthor
)

router.get(
    '/random', 
    author.random
)

router.get(
    '/poems/:id',
    validation.getPoemsList,
    author.getPoemsList
)

router.post(
    '/create',
    auth.authAdmin,
    validation.create,
    author.create
)

router.patch(
    '/update/:id',
    auth.authAdmin,
    validation.update,
    author.update
)

export default router;