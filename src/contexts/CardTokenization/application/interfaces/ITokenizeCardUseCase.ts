import { CardTokenizationRequest } from '../dto/CardTokenizationRequest';

export interface ITokenizeCardUseCase {
    execute(data: CardTokenizationRequest): Promise<string>;
}
