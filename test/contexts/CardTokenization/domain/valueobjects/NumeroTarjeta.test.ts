import { NumeroTarjeta } from '../../../../../src/contexts/CardTokenization/domain/valueobjects/NumeroTarjeta';

describe('NumeroTarjeta', () => {
    it('debe crear una NumeroTarjeta válida con un número de tarjeta que cumpla con el Algoritmo de Luhn', () => {
        const valorTarjetaValida = '4242424242424242';
        const numeroTarjeta = new NumeroTarjeta(valorTarjetaValida);
        expect(numeroTarjeta.toString()).toBe(valorTarjetaValida);
    });

    it('no debe crear una NumeroTarjeta con un número de tarjeta inválido', () => {
        const valorTarjetaInvalida = '1234567890123456';
        expect(() => new NumeroTarjeta(valorTarjetaInvalida)).toThrow('Número de tarjeta inválido');
    });

    
});
