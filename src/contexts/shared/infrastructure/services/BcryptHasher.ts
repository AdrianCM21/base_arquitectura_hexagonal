import { Hasher } from "../../domain/services/Hasher";
import bcrypt from 'bcrypt';

export class BcryptHasher implements Hasher {
    hash(text: string): string {
        const saltOrRound = 10;
        return bcrypt.hashSync(text, saltOrRound);
    }
    compare(hashed: string, str: string): boolean {
        return bcrypt.compareSync(str, hashed);
    }
}