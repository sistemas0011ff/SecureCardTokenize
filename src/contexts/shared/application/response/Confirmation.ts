 
export class ConfirmationResponse {
    success: boolean;
    responseCode: string;
    message: string;
    id: string;

    constructor(success: boolean, responseCode: string, message: string, id: string) {
        this.success = success;
        this.responseCode = responseCode;
        this.message = message;
        this.id = id;
    }

    
    static success(message: string, id: string): ConfirmationResponse {
        return new ConfirmationResponse(true, "0", message, id);
    }

    static error(message: string, responseCode: string = "1"): ConfirmationResponse {
        return new ConfirmationResponse(false, responseCode, message, "");
    }
}
