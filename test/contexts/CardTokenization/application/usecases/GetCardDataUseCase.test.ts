import { GetCardDataUseCase } from '../../../../../src/contexts/CardTokenization/application/usecases/GetCardDataUseCase';
import { IQueryBus } from '../../../../../src/contexts/shared/cqrs/IQueryBus';
import { GetCardDataQuery } from '../../../../../src/contexts/CardTokenization/application/queries/GetCardDataQuery';
import { DatosTarjeta } from '../../../../../src/contexts/CardTokenization/application/types/DatosTarjeta';

describe('GetCardDataUseCase', () => {
    let queryBusMock: jest.Mocked<IQueryBus>;
    let getCardDataUseCase: GetCardDataUseCase;

    beforeEach(() => {
        queryBusMock = {
            execute: jest.fn(),
        };
        getCardDataUseCase = new GetCardDataUseCase(queryBusMock);
    });

    it('should return card data for a valid token', async () => {
        const token = 'valid_token';
        const expectedCardData: DatosTarjeta = {
            cardNumber: '4242424242424242',
            expirationDate:"12/2025",
            email: 'test@example.com',
        };
        queryBusMock.execute.mockResolvedValue(expectedCardData);

        const result = await getCardDataUseCase.execute(token);

        expect(queryBusMock.execute).toHaveBeenCalledWith(new GetCardDataQuery(token));
        expect(result).toEqual(expectedCardData);
    });

    it('should return null for an invalid or expired token', async () => {
        const invalidToken = 'invalid_token';
        queryBusMock.execute.mockResolvedValue(null);

        const result = await getCardDataUseCase.execute(invalidToken);

        expect(queryBusMock.execute).toHaveBeenCalledWith(new GetCardDataQuery(invalidToken));
        expect(result).toBeNull();
    });

    // Aquí puedes añadir más pruebas según sea necesario...
});
