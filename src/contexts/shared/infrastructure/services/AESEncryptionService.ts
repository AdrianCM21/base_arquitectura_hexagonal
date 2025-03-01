import { config } from "../../../../config";
import { EncryptionService } from "../../domain/services/EncryptionService";
import crypto from 'node:crypto';

export class AESEncryptionService implements EncryptionService {
    private encryptionKey;
    private iv;
    constructor() {
        this.encryptionKey = config.security.encriptionKey;
        this.iv = config.security.initialVector;
    }
    encrypt(data: string): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), Buffer.from(this.iv, 'hex'));
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decrypt(encrypted: string): string {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), Buffer.from(this.iv, 'hex'));
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}