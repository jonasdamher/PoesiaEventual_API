'use strict';

import express from 'express';
import * as validation from './author-validation';
import * as author from './author-controller';

const router = express.Router()

router.get('/', validation.getAll, author.getAll)
router.get('/get/:id', validation.getWithId, author.getWithId)
router.get('/search/:search', validation.searchAuthor, author.searchAuthor)
router.get('/random', author.random)
router.get('/poems/:id', validation.getPoemsList, author.getPoemsList)

export default router;