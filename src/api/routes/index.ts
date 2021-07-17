'use strict';

import express from 'express';
const router = express.Router()
// Import routes
import authors from '../components/authors';
import books from '../components/books';
import editorials from '../components/editorials';
import literary_genres from '../components/literary_genres';
import occupations from '../components/occupations';
import poems from '../components/poems';
import recognitions from '../components/recognitions';

import users from '../components/users';
import countries from '../components/countries';

router.use('/authors', authors);
router.use('/books', books);
router.use('/editorials', editorials);
router.use('/literary_genres', literary_genres);
router.use('/occupations', occupations);
router.use('/poems', poems);
router.use('/recognitions', recognitions);

router.use('/users', users);
router.use('/countries', countries);

export default router;