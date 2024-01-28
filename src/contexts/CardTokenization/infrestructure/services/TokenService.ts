import { DatosToken } from '@contexts/CardTokenization/domain/types/DatosToken';
import { EncryptionService } from '../../../../contexts/shared/infrastructure/crypto/EncryptionService';
import { IRedisService } from '../../../../contexts/shared/infrastructure/redis/IRedisService';
import { ITokenService } from '../../domain/services/ITokenService';
import { DatosTarjeta } from '../../domain/types/DatosTarjeta';
import jwt from 'jsonwebtoken';

export class TokenService implements ITokenService {
  private redisService: IRedisService;
  private encryptionService: EncryptionService;
  private jwtSecretKey: string;

  constructor(redisService: IRedisService, encryptionService: EncryptionService, jwtSecretKey: string) {
    this.redisService = redisService;
    this.encryptionService = encryptionService;
    this.jwtSecretKey = jwtSecretKey; 
  }

  async generarToken(datos: DatosToken): Promise<string> {
    try {
      const token = jwt.sign({ data: datos }, this.jwtSecretKey, { expiresIn: '1m' });
      const encryptedData = this.encryptionService.encrypt(JSON.stringify(datos));
      await this.redisService.set(token, encryptedData, 60);
      return token;
    } catch (error) {
      throw new Error(`Error generating token: ${error.message}`);
    }
  }

  async getCardData(token: string): Promise<DatosTarjeta | null> {
    if (!token) {
      throw new Error("No token provided");
    }

    try {
      const encryptedData = await this.redisService.get(token);

      if (!encryptedData) {
        throw new Error(`No encrypted data found for token: ${token}`);
      }

      const decryptedData = this.encryptionService.decrypt(encryptedData);
      const cardData = JSON.parse(decryptedData) as DatosTarjeta;
      return cardData;
    } catch (error) {
      throw new Error(`Error getting card data for token ${token}: ${error.message}`);
    }
  }
}