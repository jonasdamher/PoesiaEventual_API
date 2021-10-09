'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../components/auth"));
const authors_1 = __importDefault(require("../components/authors"));
const books_1 = __importDefault(require("../components/books"));
const editorials_1 = __importDefault(require("../components/editorials"));
const literary_genres_1 = __importDefault(require("../components/literary_genres"));
const occupations_1 = __importDefault(require("../components/occupations"));
const poems_1 = __importDefault(require("../components/poems"));
const recognitions_1 = __importDefault(require("../components/recognitions"));
const users_1 = __importDefault(require("../components/users"));
const countries_1 = __importDefault(require("../components/countries"));
class Routes {
    constructor() {
        this.routes = express_1.default.Router({ caseSensitive: true, strict: true });
    }
    load() {
        return this.routes
            .use('/auth', auth_1.default.routes())
            .use('/authors', authors_1.default.routes())
            .use('/books', books_1.default.routes())
            .use('/editorials', editorials_1.default.routes())
            .use('/literary_genres', literary_genres_1.default.routes())
            .use('/occupations', occupations_1.default.routes())
            .use('/poems', poems_1.default.routes())
            .use('/recognitions', recognitions_1.default.routes())
            .use('/users', users_1.default.routes())
            .use('/countries', countries_1.default.routes());
    }
}
exports.default = new Routes().load();
//# sourceMappingURL=index.js.map