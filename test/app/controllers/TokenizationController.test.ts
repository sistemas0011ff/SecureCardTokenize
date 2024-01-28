import TokenizationController from '../../../src/app/controllers/tokenization/TokenizationController';
import { Request, Response } from 'express';
import { ITokenizationService } from '../../../src/contexts/CardTokenization/application/interfaces/ITokenizationService';
import { CardTokenizationRequest } from '../../../src/contexts/CardTokenization/application/dto/CardTokenizationRequest';
import { DatosTarjeta } from '../../../src/contexts/CardTokenization/application/types/DatosTarjeta';

const mockTokenizationService: jest.Mocked<ITokenizationService> = {
  tokenizeCard: jest.fn(),
  getCardData: jest.fn()
};
 
const mockRequest = (body: any = {}, headers: any = {}): Partial<Request> => ({
  body,
  headers,
  header: jest.fn((name: string) => headers[name])
});
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('TokenizationController', () => {
  let controller: TokenizationController;

  beforeEach(() => { 
    controller = new TokenizationController(mockTokenizationService);
    jest.clearAllMocks();
  });

  describe('createToken', () => {
    it('should create a token successfully', async () => {
      const req = mockRequest({
        email: 'test@example.com',
        card_number: '1234567890123456',
        cvv: '123',
        expiration_year: '2030',
        expiration_month: '12'
      }) as Request;
      const res = mockResponse() as Response;

      const expectedToken = 'token123';
      mockTokenizationService.tokenizeCard.mockResolvedValue(expectedToken);

      await controller.createToken(req, res);

      expect(mockTokenizationService.tokenizeCard).toHaveBeenCalledWith(expect.any(CardTokenizationRequest));
      expect(res.json).toHaveBeenCalledWith({ token: expectedToken });
      expect(res.status).not.toHaveBeenCalledWith(400);
    });
 
  });

  describe('getCardData', () => {
    it('should retrieve card data successfully', async () => {
      const token = 'valid-token';
      const req = mockRequest({}, { 'authorization': `Bearer ${token}` }) as Request;
      const res = mockResponse() as Response;

      const expectedCardData: DatosTarjeta = {
        cardNumber: '1234567890123456',
        expirationDate: "12/2030",
        email: 'test@example.com'
      };
      mockTokenizationService.getCardData.mockResolvedValue(expectedCardData);

      await controller.getCardData(req, res);

      expect(mockTokenizationService.getCardData).toHaveBeenCalledWith(token);
      expect(res.json).toHaveBeenCalledWith(expectedCardData);
      expect(res.status).not.toHaveBeenCalledWith(401);
      expect(res.status).not.toHaveBeenCalledWith(404);
    });
 
  });
 
});
