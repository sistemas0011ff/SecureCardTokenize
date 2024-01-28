
export class Cvv {
    private valor: string;

    constructor(valor: string) {
        if (!this.esValido(valor)) {
            throw new Error("CVV inválido");
        }
        this.valor = valor;
    }

    private esValido(valor: string): boolean {
        return /^\d{3,4}$/.test(valor);
    }

    public obtenerValor(): string {
        return this.valor;
    }
}
