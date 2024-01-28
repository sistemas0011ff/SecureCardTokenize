import { ICommand } from '../../../../contexts/shared/cqrs/ICommand';
import { CardTokenizationRequest } from '../dto/CardTokenizationRequest';

export class TokenizeCardCommand implements ICommand {
    public readonly cardTokenizationRequest: CardTokenizationRequest;

    constructor(cardTokenizationRequest: CardTokenizationRequest) {
        this.cardTokenizationRequest = cardTokenizationRequest;
    }

    validate(): void | Promise<void> {
    }
}
