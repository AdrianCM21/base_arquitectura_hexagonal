export interface EncryptionService {
    encrypt(data: string): string
    decrypt(encrypted: string): string
}