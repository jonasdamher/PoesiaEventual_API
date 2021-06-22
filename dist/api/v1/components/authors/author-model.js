'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const author_schema = new mongoose_1.Schema({
    name: {
        type: String,
        min: 2,
        validate: {
            validator: function (v) {
                return /[^0-9]/.test(v);
            },
            message: (props) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: [true, 'Es obligatorio introducir un nombre.'],
        unique: [true, 'El nombre introducido ya existe.']
    }
});
exports.default = mongoose_1.model('authors', author_schema);
//# sourceMappingURL=author-model.js.map