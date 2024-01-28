
import { GetCardDataQueryHandler } from '../../../../../src/contexts/CardTokenization/application/handlers/GetCardDataQueryHandler';
import { GetCardDataQuery } from '../../../../../src/contexts/CardTokenization/application/queries/GetCardDataQuery';
import { DatosTarjeta } from '../../../../../src/contexts/CardTokenization/application/types/DatosTarjeta';
import { ITokenService } from '../../../../../src/contexts/CardTokenization/domain/services/ITokenService';

describe('GetCardDataQueryHandler', () => {
    let tokenServiceMock: jest.Mocked<ITokenService>;
    let getCardDataQueryHandler: GetCardDataQueryHandler;

    beforeEach(() => {
       
        tokenServiceMock = {
            generarToken: jest.fn(),
            getCardData: jest.fn(),
        };
        getCardDataQueryHandler = new GetCardDataQueryHandler(tokenServiceMock);
    });

    it('should return card data when token is valid', async () => {
        const token = 'valid_token';
        const expectedCardData: DatosTarjeta = {
            cardNumber: '4242424242424242',
            expirationDate:"12/2025",
            email: 'test@example.com',
        };
        tokenServiceMock.getCardData.mockResolvedValue(expectedCardData);

        const query = new GetCardDataQuery(token);
        const result = await getCardDataQueryHandler.execute(query);

        expect(tokenServiceMock.getCardData).toHaveBeenCalledWith(token);
        expect(result).toEqual(expectedCardData);
    });

    it('should return null when token is invalid', async () => {
        const invalidToken = 'invalid_token';
        tokenServiceMock.getCardData.mockResolvedValue(null);

        const query = new GetCardDataQuery(invalidToken);
        const result = await getCardDataQueryHandler.execute(query);

        expect(tokenServiceMock.getCardData).toHaveBeenCalledWith(invalidToken);
        expect(result).toBeNull();
    });

    
});
