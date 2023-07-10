'use strict';

import pino, { Logger } from 'pino';

/**
 * Configuración de logger.
 * Registrar errores de la app en archivos JSON.
 * Por cada componente creado, 1 logger.
 */


const commons_options: any = {
    sync: false
};

// FOR COMPONENTS
export const logger_users: Logger = pino(
    commons_options,
    pino.destination('./logs/components/users.json')).child({ component: 'users' });

export const logger_authors: Logger = pino(
    commons_options,
    pino.destination('./logs/components/authors.json')).child({ component: 'authors' });

export const logger_books: Logger = pino(
    commons_options,
    pino.destination('./logs/components/books.json')).child({ component: 'books' });


export const logger_poems: Logger = pino(
    commons_options,
    pino.destination('./logs/components/poems.json')).child({ component: 'poems' });

export const logger_recognitions: Logger = pino(
    commons_options,
    pino.destination('./logs/components/recognitions.json')).child({ component: 'recognitions' });


export const logger_editorials: Logger = pino(
    commons_options,
    pino.destination('./logs/components/editorials.json')).child({ component: 'editorials' });

export const logger_occupation: Logger = pino(
    commons_options,
    pino.destination('./logs/components/occupations.json')).child({ component: 'occupations' });

export const logger_genre: Logger = pino(
    commons_options,
    pino.destination('./logs/components/literary_genre.json')).child({ component: 'literary_genre' });

export const logger_countries: Logger = pino(
    commons_options,
    pino.destination('./logs/components/countries.json')).child({ component: 'countries' });

// FINAL - FOR COMPONENTS

export const logger_email: Logger = pino(
    commons_options,
    pino.destination('./logs/email.json')).child({ component: 'email' });

export const logger_app: Logger = pino(
    commons_options,
    pino.destination('./logs/app.json')).child({ component: 'app' });

const logger_node: Logger = pino(
    commons_options,
    pino.destination('./logs/node.json')).child({ component: 'node' });

process.on('uncaughtException', (err: any) => {
    logger_node.error({ err }, 'uncaughtException');
    process.exit(1);
});

process.on('unhandledRejection', (err: any) => {
    logger_node.error({ err }, 'unhandledRejection');
    process.exit(1);
});
