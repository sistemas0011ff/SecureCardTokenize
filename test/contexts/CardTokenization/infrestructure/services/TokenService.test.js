 
const { TokenService } = require('../../../../../src/contexts/CardTokenization/infrastructure/services/TokenService');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('TokenService', () => {
  let redisServiceMock;
  let encryptionServiceMock;
  let tokenService;
  const jwtSecretKey = 'test_secret';

  beforeEach(() => {
    redisServiceMock = {
      set: jest.fn(),
      get: jest.fn(),
    };
    encryptionServiceMock = {
      encrypt: jest.fn(),
      decrypt: jest.fn(),
    };
    tokenService = new TokenService(redisServiceMock, encryptionServiceMock, jwtSecretKey);
  });

  describe('generarToken', () => {
    it('should generate a token and store encrypted data in Redis', async () => {
      const datosToken = {
        cardNumber: '4242424242424242',
        expirationDate: '12/2025',
        cvv: '123',
        email: 'test@example.com',
      };
      const fakeToken = 'generated_token';
      jwt.sign.mockReturnValue(fakeToken);

      const result = await tokenService.generarToken(datosToken);

      expect(jwt.sign).toHaveBeenCalledWith({ data: datosToken }, jwtSecretKey, { expiresIn: '1m' });
      expect(encryptionServiceMock.encrypt).toHaveBeenCalledWith(JSON.stringify(datosToken));
      expect(redisServiceMock.set).toHaveBeenCalledWith(fakeToken, expect.any(String), 60);
      expect(result).toEqual(fakeToken);
    });
  });

  describe('getCardData', () => {
    it('should retrieve and decrypt card data from Redis', async () => {
      const token = 'valid_token';
      const encryptedData = 'encrypted_data';
      const decryptedData = JSON.stringify({
        cardNumber: '4242424242424242',
        expirationMonth: '12',
        expirationYear: '2025',
        email: 'test@example.com',
      });

      redisServiceMock.get.mockResolvedValue(encryptedData);
      encryptionServiceMock.decrypt.mockReturnValue(decryptedData);

      const result = await tokenService.getCardData(token);

      expect(redisServiceMock.get).toHaveBeenCalledWith(token);
      expect(encryptionServiceMock.decrypt).toHaveBeenCalledWith(encryptedData);
      expect(result).toEqual(JSON.parse(decryptedData));
    });

    it('should return null if data is not found in Redis', async () => {
      const token = 'invalid_token';
      redisServiceMock.get.mockResolvedValue(null);

      const result = await tokenService.getCardData(token);

      expect(redisServiceMock.get).toHaveBeenCalledWith(token);
      expect(result).toBeNull();
    });
  });
});
