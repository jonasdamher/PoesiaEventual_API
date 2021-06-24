'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./api/app"));
const config_1 = __importDefault(require("./api/v1/config"));
mongoose_1.default.connect(config_1.default.mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    try {
        app_1.default.listen(config_1.default.port);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map