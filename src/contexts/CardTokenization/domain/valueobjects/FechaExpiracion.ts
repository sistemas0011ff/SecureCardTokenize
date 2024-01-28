
export class FechaExpiracion {
    private mes: number;
    private anio: number;

    constructor(mes: number, anio: number) {
        if (!this.esValida(mes, anio)) {
            throw new Error("Fecha de expiración inválida");
        }
        this.mes = mes;
        this.anio = anio;
    }

    
    private esValida(mes: number, anio: number): boolean {
        // Asegurarse de que el mes esté en el rango correcto (1-12)
        if (mes < 1 || mes > 12) {
            return false;
        }

        const fechaActual = new Date();
        const fechaExpiracion = new Date(anio, mes - 1);

        return fechaExpiracion >= fechaActual;
    }


    toString(): string {
        
        return `${this.mes.toString().padStart(2, '0')}/${this.anio}`;
    }
}
