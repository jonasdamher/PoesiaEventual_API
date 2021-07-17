'use strict';

/**
 * Sirve para darle formato a texto. 
 */
class Text {

    /**
     * Transforma un texto con acentos, mayusculas a minusculas y elimina los caracteres especiales.
     * @param text 
     * @returns 
     */
    #normalize(text: string) {
        return text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    url(text: string) {
        return this.#normalize(text.trim().replace(/ /g, '-'));
    }
}
export default new Text();