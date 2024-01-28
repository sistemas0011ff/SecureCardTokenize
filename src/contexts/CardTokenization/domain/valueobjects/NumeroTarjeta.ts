
export class NumeroTarjeta {
    private valor: string;

    constructor(valor: string) {
        if (!this.esValido(valor)) {
            throw new Error("Número de tarjeta inválido");
        }
        this.valor = valor;
    }

    private esValido(valor: string): boolean {
        return this.validarConAlgoritmoLuhn(valor);
    }

    private validarConAlgoritmoLuhn(cardNumber: string): boolean {
        const reverseNumber = cardNumber.split('').reverse().map(digit => parseInt(digit, 10));
        const sum = reverseNumber.reduce((acc, digit, index) => {
            if (index % 2 === 1) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            return acc + digit;
        }, 0);
        return sum % 10 === 0;
    }
    
    public toString(): string {
        return this.valor;
    }
}
