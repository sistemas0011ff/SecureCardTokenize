
import { NumeroTarjeta } from '../valueobjects/NumeroTarjeta';
import { FechaExpiracion } from '../valueobjects/FechaExpiracion';
import { Cvv } from '../valueobjects/Cvv';
import { Email } from '../valueobjects/Email';
import { InformacionTarjetaParaTokenizacion } from '../types/InformacionTarjetaParaTokenizacion';

export class TarjetaDeCredito {
    private numeroTarjeta: NumeroTarjeta;
    private fechaExpiracion: FechaExpiracion;
    private cvv: Cvv;
    private email: Email;

    constructor(numeroTarjeta: NumeroTarjeta, fechaExpiracion: FechaExpiracion, cvv: Cvv, email: Email) {
        this.numeroTarjeta = numeroTarjeta;
        this.fechaExpiracion = fechaExpiracion;
        this.cvv = cvv;
        this.email = email;
    }
 
    prepararDatosParaTokenizacion(): InformacionTarjetaParaTokenizacion {
        
        return {
            numeroTarjeta: this.numeroTarjeta.toString(),
            fechaExpiracion: this.fechaExpiracion.toString(),
            cvv: this.cvv.obtenerValor(), // Aquí cambia a obtenerValor() si quieres usar esa función
            email: this.email.toString()
        };
    }
}
 