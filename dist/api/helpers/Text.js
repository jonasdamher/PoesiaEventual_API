'use strict';
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Text_instances, _Text_normalize;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sirve para darle formato a texto.
 */
class Text {
    constructor() {
        _Text_instances.add(this);
    }
    url(text) {
        return __classPrivateFieldGet(this, _Text_instances, "m", _Text_normalize).call(this, text.trim().replace(/ /g, '-'));
    }
}
_Text_instances = new WeakSet(), _Text_normalize = function _Text_normalize(text) {
    return text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
exports.default = new Text();
//# sourceMappingURL=Text.js.map