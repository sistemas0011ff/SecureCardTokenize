import { TarjetaDeCredito } from '../../../../../src/contexts/CardTokenization/domain/aggregates/TarjetaDeCredito';
import { NumeroTarjeta } from '../../../../../src/contexts/CardTokenization/domain/valueobjects/NumeroTarjeta';
import { FechaExpiracion } from '../../../../../src/contexts/CardTokenization/domain/valueobjects/FechaExpiracion';
import { Cvv } from '../../../../../src/contexts/CardTokenization/domain/valueobjects/Cvv';
import { Email } from '../../../../../src/contexts/CardTokenization/domain/valueobjects/Email';

describe('TarjetaDeCredito', () => {
    it('debe crear una instancia válida de TarjetaDeCredito', () => {
        const numeroTarjeta = new NumeroTarjeta('4242424242424242');
        const fechaExpiracion = new FechaExpiracion(12, 2025);
        const cvv = new Cvv('123');
        const email = new Email('test@example.com');
        
        const tarjetaDeCredito = new TarjetaDeCredito(numeroTarjeta, fechaExpiracion, cvv, email);

        expect(tarjetaDeCredito).toBeDefined();
        expect(tarjetaDeCredito.prepararDatosParaTokenizacion()).toEqual({
            numeroTarjeta: '4242424242424242',
            fechaExpiracion: '12/2025',
            cvv: '123',
            email: 'test@example.com'
        });
    });

    it('debe lanzar un error con datos inválidos', () => {
        expect(() => {
            new TarjetaDeCredito(new NumeroTarjeta('1111111111111111'), new FechaExpiracion(1, 2000), new Cvv('abc'), new Email('email_incorrecto@example.com'));
        }).toThrow();
    });
});
