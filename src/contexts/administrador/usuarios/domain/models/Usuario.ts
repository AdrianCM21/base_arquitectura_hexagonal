import { AggregateRoot } from "../../../../shared/domain/AggregateRoot";
import { Hasher } from "../../../../shared/domain/services/Hasher";
import { IncorrectAuthenticationData } from "../exceptions/IncorrectAuthenticationData";
import { UsuarioEmail } from "./UsuarioEmail";
import { UsuarioId } from "./UsuarioId";
import { UsuarioNombre } from "./UsuarioNombre";
import { UsuarioNotFound } from "../exceptions/UsuarioNotFound";
import { UsuarioPassword } from "./UsuarioPassword";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

export type UsuarioPrimitives = {
    id: string,
    nombre: string,
    email: string,
    password: string,
}

export class Usuario extends AggregateRoot {

    readonly id: UsuarioId;
    readonly nombre: UsuarioNombre;
    readonly email: UsuarioEmail;
    readonly password: UsuarioPassword;

    constructor(id: UsuarioId, nombre: UsuarioNombre, email: UsuarioEmail, password: UsuarioPassword) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    public static async authenticate(data: { email: string, password: string }, usuarioRepository: UsuarioRepository, hasher: Hasher) {
        try {
            const usuario = await usuarioRepository.findByEmail(new UsuarioEmail(data.email));

            if (!usuario.password.compare(data.password, hasher)) {
                throw new IncorrectAuthenticationData("Email o contraseña incorrectas");
            }

            return usuario;
        } catch (error) {
            if (error instanceof UsuarioNotFound)
                throw new IncorrectAuthenticationData("Email o contraseña incorrectas");
            throw error;
        }
    }

    toPrimitives() {
        return {
            id: this.id.value,
            nombre: this.nombre.value,
            email: this.email.value,
        };
    }

    public static fromPrimitives(data: UsuarioPrimitives) {
        return new Usuario(
            new UsuarioId(data.id),
            new UsuarioNombre(data.nombre),
            new UsuarioEmail(data.email),
            new UsuarioPassword(data.password),
        );
    }
}