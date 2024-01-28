import { Email } from "../../../../../src/contexts/CardTokenization/domain/valueobjects/Email";

 
describe('Email', () => {
    it('debe crear un Email válido', () => {
        const emailValue = 'test@example.com';
        const email = new Email(emailValue);
        expect(email.toString()).toBe(emailValue);
    });

    it('no debe crear un Email con formato inválido', () => {
        const emailInvalido = 'test@';
        expect(() => new Email(emailInvalido)).toThrow('Email inválido');
    });

    it('no debe crear un Email vacío', () => {
        expect(() => new Email('')).toThrow('Email inválido');
    });

    it('no debe crear un Email sin dominio', () => {
        expect(() => new Email('test@dominio')).toThrow('Email inválido');
    });

    it('no debe crear un Email sin usuario', () => {
        expect(() => new Email('@example.com')).toThrow('Email inválido');
    });

    it('no debe crear un Email con espacios', () => {
        expect(() => new Email('test @example.com')).toThrow('Email inválido');
    });
});
