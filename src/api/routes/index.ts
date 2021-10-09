'use strict';

import express, { Router } from 'express';

import auth from '../components/auth';
import authors from '../components/authors';
import books from '../components/books';
import editorials from '../components/editorials';
import literary_genres from '../components/literary_genres';
import occupations from '../components/occupations';
import poems from '../components/poems';
import recognitions from '../components/recognitions';
import users from '../components/users';
import countries from '../components/countries';

class Routes {

    private routes: Router = express.Router({ caseSensitive: true, strict: true });

    public load(): Router {
        return this.routes
            .use('/auth', auth.routes())
            .use('/authors', authors.routes())
            .use('/books', books.routes())
            .use('/editorials', editorials.routes())
            .use('/literary_genres', literary_genres.routes())
            .use('/occupations', occupations.routes())
            .use('/poems', poems.routes())
            .use('/recognitions', recognitions.routes())
            .use('/users', users.routes())
            .use('/countries', countries.routes());
    }
}

export default new Routes().load();