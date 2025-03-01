import { DatabaseProvider } from "../../../../shared/infrastructure/database/DatabaseProvider";
import { Usuario } from "../../domain/models/Usuario";
import { Usuario as UsuarioEntity } from "../../../../shared/infrastructure/database/entities/Usuario";
import { UsuarioEmail } from "../../domain/models/UsuarioEmail";
import { UsuarioId } from "../../domain/models/UsuarioId";
import { UsuarioRepository } from "../../domain/repositories/UsuarioRepository";
import { UsuarioNotFound } from "../../domain/exceptions/UsuarioNotFound";

export class TypeORMUsuarioRepository implements UsuarioRepository {

    async findById(id: UsuarioId): Promise<Usuario> {

        if (!DatabaseProvider.datasource)
            throw Error("Base de datos no inicializada");

        const usuarioRepository = DatabaseProvider.datasource.getRepository(UsuarioEntity);
        const usuario = await usuarioRepository.findOneBy({ id: id.value });

        if (!usuario)
            throw new UsuarioNotFound(`No se encontró el usuario con el id <${id.value}> `);

        return Usuario.fromPrimitives({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
        });
    }
    async findByEmail(email: UsuarioEmail): Promise<Usuario> {
        if (!DatabaseProvider.datasource)
            throw Error("Base de datos no inicializada");

        const usuarioRepository = DatabaseProvider.datasource.getRepository(UsuarioEntity);
        const usuario = await usuarioRepository.findOneBy({ email: email.value });

        if (!usuario)
            throw new UsuarioNotFound(`No se encontró el usuario con el email <${email.value}> `);

        return Usuario.fromPrimitives({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
        });
    }

}