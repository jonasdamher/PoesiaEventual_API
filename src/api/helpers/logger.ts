'use strict';

import pino from 'pino';

/**
 * Configuración de logger.
 * Registrar errores de la app en archivos JSON.
 * Por cada componente creado, 1 logger.
 */


const commons_options = {
    sync: false
};

// FOR COMPONENTS
export const logger_users = pino(pino.destination({
    dest: './logs/components/users.json',
    ...commons_options
})).child({ component: 'users' });

export const logger_authors = pino(pino.destination({
    dest: './logs/components/authors.json',
    ...commons_options
})).child({ component: 'users' });

export const logger_books = pino(pino.destination({
    dest: './logs/components/books .json',
    ...commons_options
})).child({ component: 'books ' });

export const logger_poems = pino(pino.destination({
    dest: './logs/components/poems.json',
    ...commons_options
})).child({ component: 'poems' });

export const logger_recognitions = pino(pino.destination({
    dest: './logs/components/recognitions.json',
    ...commons_options
})).child({ component: 'recognitions' });

// FINAL - FOR COMPONENTS

export const logger_email = pino(pino.destination({
    dest: './logs/emails.json',
    ...commons_options
})).child({ component: 'email' });

export const logger_app = pino(pino.destination({
    dest: './logs/app.json',
    ...commons_options
})).child({ component: 'app' });

const logger_node = pino(pino.destination({
    dest: './logs/node.json',
    ...commons_options
})).child({ component: 'node' });

process.on('uncaughtException', pino.final(logger_node, (err, finalLogger) => {
    finalLogger.error({ err }, 'uncaughtException');
    process.exit(1);
}));

process.on('unhandledRejection', pino.final(logger_node, (err, finalLogger) => {
    finalLogger.error({ err }, 'unhandledRejection');
    process.exit(1);
}));