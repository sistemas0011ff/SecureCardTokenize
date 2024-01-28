import { IQueryHandler } from '../../../../contexts/shared/cqrs/IQueryHandler';
import { ITokenService } from '../../domain/services/ITokenService';
import { GetCardDataQuery } from '../queries/GetCardDataQuery';
import { DatosTarjeta } from '../types/DatosTarjeta';

export class GetCardDataQueryHandler implements IQueryHandler<GetCardDataQuery, DatosTarjeta | null> {
    constructor(private tokenService: ITokenService) {}

    async execute(query: GetCardDataQuery): Promise<DatosTarjeta | null> {
        const cardData = await this.tokenService.getCardData(query.token);

        if (!cardData) {
            return null;
        } 

        const datosTarjeta: DatosTarjeta = {
            cardNumber: cardData.cardNumber,
            expirationDate: cardData.expirationDate,
            email: cardData.email
        };

        return datosTarjeta;
    }
}
