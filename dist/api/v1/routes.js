'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Import routes
const authors_1 = __importDefault(require("./components/authors"));
const poems_1 = __importDefault(require("./components/poems"));
router.use('/authors', authors_1.default);
router.use('/poems', poems_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map