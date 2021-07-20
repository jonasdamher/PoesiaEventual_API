'use strict';

export default class ResponseHandler {

    private res_message: string = 'Success';
    private res_status: number = 200;
    private res_result: any = null;

    public message(message: string) {
        this.res_message = message;
        return this;
    }

    public status(status: number) {
        this.res_status = status;
        return this;
    }

    public result(result: any) {
        this.res_result = result;
        return this;
    }

    public response() {
        return {
            message: this.res_message,
            status: this.res_status,
            result: this.res_result
        }
    }
}