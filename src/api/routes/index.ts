'use strict';

import express, { Router } from 'express';

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

class Routes {

    private routes: Router = express.Router();

    public load(): Router {

        this.routes.use('/authors', authors.routes());
        this.routes.use('/books', books.routes());
        this.routes.use('/editorials', editorials);
        this.routes.use('/literary_genres', literary_genres.routes());
        this.routes.use('/occupations', occupations.routes());
        this.routes.use('/poems', poems.routes());
        this.routes.use('/recognitions', recognitions.routes());
        this.routes.use('/users', users.routes());
        this.routes.use('/countries', countries);

        return this.routes;
    }
}

export default new Routes().load();