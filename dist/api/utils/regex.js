'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = exports.password = exports.photo = exports.url_name = exports.text_only = void 0;
exports.text_only = /[a-zA-ZñÑáéíóú.,; ]/;
exports.url_name = /[a-z-]/;
exports.photo = /^[a-zA-Z-0-9]+\.+(png|jpg|jpeg)$/;
exports.password = /^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/;
exports.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
//# sourceMappingURL=regex.js.map