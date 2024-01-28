 
import { DatosTarjeta } from "../types/DatosTarjeta";
import { DatosToken } from "../types/DatosToken";
 
export interface ITokenService {
    generarToken(datos: DatosToken): Promise<string>;
    getCardData(token: string): Promise<DatosTarjeta | null>;  
}
