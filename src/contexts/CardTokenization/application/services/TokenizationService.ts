import { ITokenizationService } from '../interfaces/ITokenizationService';
import { CardTokenizationRequest } from '../dto/CardTokenizationRequest'; 
import { ITokenizeCardUseCase } from '../interfaces/ITokenizeCardUseCase';
import { IGetCardDataUseCase } from '../interfaces/IGetCardDataUseCase'; 
import { DatosTarjeta } from '../types/DatosTarjeta';

export class TokenizationService implements ITokenizationService {
    constructor(
        private tokenizeCardUseCase: ITokenizeCardUseCase,
        private getCardDataUseCase: IGetCardDataUseCase 
    ) {}

    async tokenizeCard(data: CardTokenizationRequest): Promise<string> {
        return this.tokenizeCardUseCase.execute(data);
    }

    async getCardData(token: string): Promise<DatosTarjeta | null> { 
        return this.getCardDataUseCase.execute(token);
    }
    
}
