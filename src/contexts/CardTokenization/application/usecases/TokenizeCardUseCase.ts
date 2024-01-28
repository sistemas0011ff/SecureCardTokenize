import { ITokenizeCardUseCase } from '../interfaces/ITokenizeCardUseCase';
import { CardTokenizationRequest } from '../dto/CardTokenizationRequest'; 
import { TokenizeCardCommand } from '../commands/TokenizeCardCommand';
import { ICommandBus } from '../../../../contexts/shared/cqrs/ICommandBus';
import { ConfirmationResponse } from '../../../../contexts/shared/application/response/Confirmation';
export class TokenizeCardUseCase implements ITokenizeCardUseCase {
    constructor(private commandBus: ICommandBus) {}

    async execute(data: CardTokenizationRequest): Promise<string> {
        const command = new TokenizeCardCommand(data);
        const result = await this.commandBus.execute<ConfirmationResponse, void>(command);

        if (!result.result.success) {
            throw new Error(result.result.message);
        }

        return result.result.id; 
    }
}
