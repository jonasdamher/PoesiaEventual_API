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

        this.routes.use('/authors', authors);
        this.routes.use('/books', books);
        this.routes.use('/editorials', editorials);
        this.routes.use('/literary_genres', literary_genres);
        this.routes.use('/occupations', occupations);
        this.routes.use('/poems', poems);
        this.routes.use('/recognitions', recognitions);

        this.routes.use('/users', users.routes());
        this.routes.use('/countries', countries);

        return this.routes;
    }
}

export default new Routes().load();