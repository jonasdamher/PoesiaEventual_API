'use strict';

/**
 * Clase para devolver datos de la API
 */
export default class ResponseHandler {

    resMessage: string;
    resStatus: number;
    resResult: any;

    constructor() {
        this.resMessage = 'Success';
        this.resStatus = 200;
        this.resResult = null;
    }
    message(message: string) {
        console.log(message)
        console.log(this.resMessage)

        this.resMessage = message;
        return this;
    }

    status(status: number) {
        this.resStatus = status;
        return this;
    }

    result(result: any) {
        this.resResult = result;
        return this;
    }

    response() {
        return {
            message: this.resMessage,
            status: this.resStatus,
            result: this.resResult
        }
    }
}