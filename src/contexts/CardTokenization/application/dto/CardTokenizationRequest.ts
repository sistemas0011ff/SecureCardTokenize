export class CardTokenizationRequest {
    email: string;
    card_number: string;
    cvv: string;
    expiration_year: string;
    expiration_month: string;

    constructor(email: string, card_number: string, cvv: string, expiration_year: string, expiration_month: string) {
        this.email = email;
        this.card_number = card_number;
        this.cvv = cvv;
        this.expiration_year = expiration_year;
        this.expiration_month = expiration_month;
    }
}