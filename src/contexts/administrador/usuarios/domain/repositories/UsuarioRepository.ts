import { Usuario } from "../models/Usuario";
import { UsuarioEmail } from "../models/UsuarioEmail";
import { UsuarioId } from "../models/UsuarioId";

export interface UsuarioRepository {
    findById(id: UsuarioId): Promise<Usuario>;
    findByEmail(email: UsuarioEmail): Promise<Usuario>;
}