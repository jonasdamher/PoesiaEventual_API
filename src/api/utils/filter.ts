'use strict';

export const array_filter = (actual: Array<any> | [], nuevo: Array<any> | [], key_filter: any = ''): Array<any> => {

    let filter: Array<any> = [];

    if (nuevo && Array.isArray(nuevo) && nuevo.length) {

        actual.forEach((word: any) => {

            // Filtrar datos existentes para actualizar
            const existing = key_filter.length ?
                nuevo.findIndex((exists: any) => exists[key_filter] === word[key_filter].toString()) :
                nuevo.findIndex((exists: any) => exists === word.toString());

            if (existing === -1) {
                filter.push(word);
            }

        });
    }
    return filter;
}; 