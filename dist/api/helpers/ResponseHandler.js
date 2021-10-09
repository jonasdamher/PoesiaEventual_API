'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    constructor() {
        this.resMessage = 'Success';
        this.resStatus = 200;
        this.resResult = null;
    }
    message(message) {
        console.log(message);
        console.log(this.resMessage);
        this.resMessage = message;
        return this;
    }
    status(status) {
        this.resStatus = status;
        return this;
    }
    result(result) {
        this.resResult = result;
        return this;
    }
    response() {
        return {
            message: this.resMessage,
            status: this.resStatus,
            result: this.resResult
        };
    }
}
exports.default = ResponseHandler;
//# sourceMappingURL=ResponseHandler.js.map