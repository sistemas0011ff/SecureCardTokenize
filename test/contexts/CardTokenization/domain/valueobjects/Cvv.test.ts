
import { Cvv } from "../../../../../src/contexts/CardTokenization/domain/valueobjects/Cvv";

 
describe('Cvv', () => {
    it('debe crear un CVV válido con 3 dígitos', () => {
        const cvv = new Cvv('123');
        expect(cvv.obtenerValor()).toBe('123');
    });

    it('debe crear un CVV válido con 4 dígitos', () => {
        const cvv = new Cvv('1234');
        expect(cvv.obtenerValor()).toBe('1234');
    });

    it('no debe crear un CVV con menos de 3 dígitos', () => {
        expect(() => new Cvv('12')).toThrow('CVV inválido');
    });

    it('no debe crear un CVV con más de 4 dígitos', () => {
        expect(() => new Cvv('12345')).toThrow('CVV inválido');
    });

    it('no debe crear un CVV con caracteres no numéricos', () => {
        expect(() => new Cvv('12a')).toThrow('CVV inválido');
    });
});
