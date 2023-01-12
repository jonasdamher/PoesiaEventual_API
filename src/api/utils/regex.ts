'use strict';

/**
 * Expresiones regulares para validar información en los modelos con la librería Mongose
 */
export const text_only = /[a-zA-ZñÑáéíóú.,; ]/;
export const url_name = /[a-z-]/;
export const photo = /^[a-zA-Z-0-9]+\.+(png|jpg|jpeg)$/;
export const password = /^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/;
export const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
