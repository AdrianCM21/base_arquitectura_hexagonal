import { config } from "../../../../../config";
import { Unauthenticated } from "../../../../shared/infrastructure/exceptions/http/Unauthenticated";
import { AuthenticationService, Token } from "../../application/services/AuthenticationService";
import { Usuario } from "../../domain/models/Usuario";
import { UsuarioId } from "../../domain/models/UsuarioId";
import { UsuarioNotFound } from "../../domain/exceptions/UsuarioNotFound";
import { UsuarioRepository } from "../../domain/repositories/UsuarioRepository";
import { TypeORMUsuarioRepository } from "../repositories/TypeORMUsuarioRepository";
import { BcryptHasher } from "../../../../shared/infrastructure/services/BcryptHasher";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';

export class JWTAuthenticationService implements AuthenticationService {
    private secret: string;
    private expirationTime: string;
    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository) {
        this.secret = config.authentication.jwtSecret;
        this.expirationTime = config.authentication.expirationTime;
        this.usuarioRepository = usuarioRepository;
    }

    async authenticate(email: string, password: string): Promise<Token> {

        const usuario = await Usuario.authenticate(
            { email, password },
            new TypeORMUsuarioRepository(),
            new BcryptHasher(),
        );

        const token = jwt.sign({ id: usuario.id.value }, this.secret, { expiresIn: Number(this.expirationTime) });

        return {
            token: token,
            expiresIn: this.expirationTime
        };

    }

    async tryGetAuthenticatedUser(token: string): Promise<Usuario> {

        try {
            const decoded = jwt.verify(token, this.secret) as JwtPayload;
            const usuarioId = new UsuarioId(decoded.id);

            return await this.usuarioRepository.findById(usuarioId);
        } catch (error) {
            if (error instanceof UsuarioNotFound ||
                error instanceof JsonWebTokenError ||
                error instanceof TokenExpiredError)
                throw new Unauthenticated("El usuario no está autenticado");
            throw (error);
        }

    }

}