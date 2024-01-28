// ./src/contexts/shared/infrastructure/crypto/IEncryptionService.ts

export interface IEncryptionService {
    encrypt(text: string): string;
    decrypt(encrypted: string): string;
  }
  