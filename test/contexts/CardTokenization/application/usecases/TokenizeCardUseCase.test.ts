// TokenizeCardUseCase.test.ts
import { TokenizeCardUseCase } from '../../../../../src/contexts/CardTokenization/application/usecases/TokenizeCardUseCase';
import { ICommandBus } from '../../../../../src/contexts/shared/cqrs/ICommandBus';
import { CardTokenizationRequest } from '../../../../../src/contexts/CardTokenization/application/dto/CardTokenizationRequest';
import { TokenizeCardCommand } from '../../../../../src/contexts/CardTokenization/application/commands/TokenizeCardCommand';
import { ICommandResult } from '../../../../../src/contexts/shared/cqrs/ICommandResult';
import { ConfirmationResponse } from '../../../../../src/contexts/shared/application/response/Confirmation';
import { TokenizeCardResponseDTO } from '../../../../../src/contexts/CardTokenization/application/dto/TokenizeCardResponseDTO';

describe('TokenizeCardUseCase', () => {
    let commandBusMock: jest.Mocked<ICommandBus>;
    let tokenizeCardUseCase: TokenizeCardUseCase;

    beforeEach(() => {
        commandBusMock = {
            execute: jest.fn(),
        };
        tokenizeCardUseCase = new TokenizeCardUseCase(commandBusMock);
    });

    it('should return a token for valid card data', async () => {
        const cardData = new CardTokenizationRequest('test@example.com', '4242424242424242', '123', '2025', '12');
        const responseDTO: TokenizeCardResponseDTO = { message: "Token generado con éxito", token: "token_123456" };
        const successResult: ICommandResult<ConfirmationResponse, TokenizeCardResponseDTO> = { 
            result: new ConfirmationResponse(true, "0", "Token generado con éxito", "token_123456"),
            value: responseDTO
        };
        commandBusMock.execute.mockResolvedValue(successResult);

        const result = await tokenizeCardUseCase.execute(cardData);

        expect(commandBusMock.execute).toHaveBeenCalledWith(new TokenizeCardCommand(cardData));
        expect(result).toBe("token_123456");
    });

    it('should throw an error for invalid card data', async () => {
        const cardData = new CardTokenizationRequest('test@example.com', 'invalid_card_number', '123', '2025', '12');
        const errorResponse: ConfirmationResponse = new ConfirmationResponse(false, "1", "Error al generar el token", "");
        const errorResult: ICommandResult<ConfirmationResponse, TokenizeCardResponseDTO> = { 
            result: errorResponse,
            value: { message: "Error al generar el token" }
        };
        commandBusMock.execute.mockResolvedValue(errorResult);

        await expect(tokenizeCardUseCase.execute(cardData)).rejects.toThrow("Error al generar el token");
    });

    // Aquí puedes añadir más pruebas según sea necesario...
});
