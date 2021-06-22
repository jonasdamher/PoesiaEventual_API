'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = exports.password = void 0;
const password = /^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/;
exports.password = password;
const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
exports.email = email;
//# sourceMappingURL=regex.js.map