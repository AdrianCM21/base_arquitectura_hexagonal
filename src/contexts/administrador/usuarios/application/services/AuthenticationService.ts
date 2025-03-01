import { Usuario } from "../../domain/models/Usuario";

export interface Token {
    token: string
    expiresIn: string
}

export interface AuthenticationService {
    authenticate(email:string, password:string): Promise<Token>;
    tryGetAuthenticatedUser(token: string): Promise<Usuario>
}