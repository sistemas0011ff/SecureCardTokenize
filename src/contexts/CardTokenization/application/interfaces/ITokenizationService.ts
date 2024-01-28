import { CardTokenizationRequest } from '../dto/CardTokenizationRequest';
import { DatosTarjeta } from '../types/DatosTarjeta';
 
export interface ITokenizationService {
    tokenizeCard(data: CardTokenizationRequest): Promise<string>;
    getCardData(token: string): Promise<DatosTarjeta | null>; // Agrega esta línea
}
