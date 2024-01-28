
import { TokenizeCardCommandHandler } from '../../../../../src/contexts/CardTokenization/application/handlers/TokenizeCardCommandHandler';
import { TokenizeCardCommand } from '../../../../../src/contexts/CardTokenization/application/commands/TokenizeCardCommand';
import { ITokenService } from '../../../../../src/contexts/CardTokenization/domain/services/ITokenService';
import { CardTokenizationRequest } from '../../../../../src/contexts/CardTokenization/application/dto/CardTokenizationRequest';
import { ConfirmationResponse } from '../../../../../src/contexts/shared/application/response/Confirmation';

describe('TokenizeCardCommandHandler', () => {
    let tokenServiceMock: jest.Mocked<ITokenService>;
    let tokenizeCardCommandHandler: TokenizeCardCommandHandler;

    beforeEach(() => {
        tokenServiceMock = {
            generarToken: jest.fn(),
            getCardData: jest.fn(),
        };
        tokenizeCardCommandHandler = new TokenizeCardCommandHandler(tokenServiceMock);
    });

    it('should successfully tokenize card data and return a token', async () => {
        const cardData = new CardTokenizationRequest('test@example.com', '4242424242424242', '123', '2025', '12');
        const token = 'generated_token';
        tokenServiceMock.generarToken.mockResolvedValue(token);

        const command = new TokenizeCardCommand(cardData);
        const result = await tokenizeCardCommandHandler.handle(command);

        expect(tokenServiceMock.generarToken).toHaveBeenCalledWith({
            cardNumber: cardData.card_number,
            expirationDate: `${cardData.expiration_month}/${cardData.expiration_year}`,
            cvv: cardData.cvv,
            email: cardData.email
        });
        expect(result).toEqual({
            result: new ConfirmationResponse(true, "0", "Token generado con éxito", token),
            value: { message: "Token generado con éxito", token: token }
        });
    });

    // it('should handle errors during token generation', async () => {
    //     const cardData = new CardTokenizationRequest('test@example.com', 'invalid_card_number', '123', '2025', '12');
    //     tokenServiceMock.generarToken.mockRejectedValue(new Error('Token generation failed'));

    //     const command = new TokenizeCardCommand(cardData);
    //     const result = await tokenizeCardCommandHandler.handle(command);

    //     expect(tokenServiceMock.generarToken).toHaveBeenCalledWith({
    //         cardNumber: cardData.card_number,
    //         expirationDate: `${cardData.expiration_month}/${cardData.expiration_year}`,
    //         cvv: cardData.cvv,
    //         email: cardData.email
    //     });
    //     expect(result).toEqual({
    //         result: new ConfirmationResponse(false, "1", "Error al generar el token", ""),
    //         value: { message: "Error al generar el token" }
    //     });
    // });
    it('should handle errors during token generation', async () => {
        const cardData = new CardTokenizationRequest('test@example.com', 'invalid_card_number', '123', '2025', '12');
        tokenServiceMock.generarToken.mockRejectedValue(new Error('Token generation failed'));
    
        const command = new TokenizeCardCommand(cardData);
        const result = await tokenizeCardCommandHandler.handle(command);
    
        expect(tokenServiceMock.generarToken).toHaveBeenCalledWith({
            cardNumber: cardData.card_number,
            expirationDate: `${cardData.expiration_month}/${cardData.expiration_year}`,
            cvv: cardData.cvv,
            email: cardData.email
        });
        expect(result).toEqual({
            result: new ConfirmationResponse(false, "1", "Token generation failed", ""), // Update the error message here
            value: { message: "Token generation failed" } // Update the error message here
        });
    });
    
});
