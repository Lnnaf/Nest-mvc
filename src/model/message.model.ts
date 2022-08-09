import { ResponseStatus } from "../enums/response.status.enum";

export class Message {
    constructor(status?: ResponseStatus, message?: string){
        this.status = status;
        this.message = message;
    }

    status: ResponseStatus;
    message: string;
}