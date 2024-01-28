
export class Email {
    private valor: string;

    constructor(valor: string) {
        if (!this.esValido(valor)) {
            throw new Error("Email inválido");
        }
        this.valor = valor;
    }

    private esValido(valor: string): boolean {
        return this.validateEmail(valor);
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

     
    public toString(): string {
        return this.valor;
    }
}
