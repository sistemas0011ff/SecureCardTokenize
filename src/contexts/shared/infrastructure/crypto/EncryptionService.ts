import { IEncryptionService } from "./IEncryptionService";
const CryptoJS = require('crypto-js');

export class EncryptionService implements IEncryptionService {
  private secretKey: string;

  constructor(secretKey: string) {
    if (!secretKey) {
      throw new Error("Secret key is required for EncryptionService.");
    }
    this.secretKey = secretKey;
  }

  encrypt(text: string): string {
    if (!text) {
      throw new Error("No text provided for encryption.");
    }
    // Encriptar el texto utilizando AES-256-CBC
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  decrypt(encryptedData: string): string {
    if (!encryptedData) {
      throw new Error("No encrypted data provided for decryption.");
    }
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error("Decryption failed: unable to decrypt the data.");
      }

      return decrypted;
    } catch (error) {
      throw new Error(`Decryption error: ${error.message}`);
    }
  }
}