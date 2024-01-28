import { TokenizationService } from '../../../../../src/contexts/CardTokenization/application/services/TokenizationService';
import { ITokenizeCardUseCase } from '../../../../../src/contexts/CardTokenization/application/interfaces/ITokenizeCardUseCase';
import { IGetCardDataUseCase } from '../../../../../src/contexts/CardTokenization/application/interfaces/IGetCardDataUseCase';
import { CardTokenizationRequest } from '../../../../../src/contexts/CardTokenization/application/dto/CardTokenizationRequest';
import { DatosTarjeta } from '../../../../../src/contexts/CardTokenization/application/types/DatosTarjeta';

const mockTokenizeCardUseCase: jest.Mocked<ITokenizeCardUseCase> = {
  execute: jest.fn(),
};

const mockGetCardDataUseCase: jest.Mocked<IGetCardDataUseCase> = {
  execute: jest.fn(),
};

describe('TokenizationService', () => {
  let service: TokenizationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TokenizationService(mockTokenizeCardUseCase, mockGetCardDataUseCase);
  });

  describe('tokenizeCard', () => {
    it('should return a token when card data is provided', async () => {
      const cardData = new CardTokenizationRequest('test@example.com', '4242424242424242', '123', '2025', '12');
      const expectedToken = 'token_123456';
      mockTokenizeCardUseCase.execute.mockResolvedValue(expectedToken);

      const result = await service.tokenizeCard(cardData);

      expect(mockTokenizeCardUseCase.execute).toHaveBeenCalledWith(cardData);
      expect(result).toBe(expectedToken);
    });

  });

  describe('getCardData', () => {
    it('should return card data when a valid token is provided', async () => {
      const token = 'valid_token';
      const expectedCardData: DatosTarjeta = {
        cardNumber: '4242424242424242',
        expirationDate: '12/2025',
        email: 'test@example.com',
      };

      mockGetCardDataUseCase.execute.mockResolvedValue(expectedCardData);

      const cardData = await service.getCardData(token);

      expect(mockGetCardDataUseCase.execute).toHaveBeenCalledWith(token);
      expect(cardData).toEqual(expectedCardData);
    });

    // Aquí puedes añadir pruebas adicionales para manejar tokens inválidos o expirados
  });

  // Continúa con más casos de prueba según sea necesario
});
