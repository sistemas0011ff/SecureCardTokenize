import { FechaExpiracion } from "../../../../../src/contexts/CardTokenization/domain/valueobjects/FechaExpiracion";

describe('FechaExpiracion', () => {
    it('debe crear una FechaExpiracion válida', () => {
        const mes = 12;
        const anio = 2025;
        const fechaExpiracion = new FechaExpiracion(mes, anio);
        expect(fechaExpiracion.toString()).toBe('12/2025');
    });

    it('no debe crear una FechaExpiracion con mes inválido', () => {
        const mesInvalido = 13;  // Meses válidos son de 1 a 12
        const anio = 2025;
        expect(() => new FechaExpiracion(mesInvalido, anio)).toThrowError("Fecha de expiración inválida");
    });

    it('no debe crear una FechaExpiracion con año pasado', () => {
        const mes = 1;
        const anioPasado = new Date().getFullYear() - 1;
        expect(() => new FechaExpiracion(mes, anioPasado)).toThrowError("Fecha de expiración inválida");
    });

    it('debe crear una FechaExpiracion válida para el mes actual o futuro en el año actual', () => {
        const mesActualOFuturo = new Date().getMonth() + 2; // +2 porque JavaScript cuenta meses desde 0 y queremos el próximo mes
        const anioActual = new Date().getFullYear();
        const fechaExpiracion = new FechaExpiracion(mesActualOFuturo, anioActual);
        expect(fechaExpiracion.toString()).toBe(`${mesActualOFuturo.toString().padStart(2, '0')}/${anioActual}`);
    });

    it('no debe crear una FechaExpiracion para un mes pasado en el año actual', () => {
        const mesPasado = new Date().getMonth(); // mes actual - 1, pero como JavaScript cuenta desde 0, esto es efectivamente el mes pasado
        const anioActual = new Date().getFullYear();
        expect(() => new FechaExpiracion(mesPasado, anioActual)).toThrowError("Fecha de expiración inválida");
    });
});
