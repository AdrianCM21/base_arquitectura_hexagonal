import { Uuid } from "../../../../shared/domain/value-object/Uuid";
import { Cliente } from "../../domain/models/Cliente";
import { ClienteRepository } from "../../domain/repositories/ClienteRepository";
import { UseCase } from "../../../../shared/application/useCases/UseCase";

export class CreateClienteUseCase implements UseCase {
    constructor(
        private readonly clienteRepository: ClienteRepository,
    ) { }
    async execute(data: { nombre: string, ruc: string, email: string, numeroTelefono: string }) {
        const cliente = Cliente.fromPrimitives({
            id: Uuid.random().value,
            nombre: data.nombre,
            ruc: data.ruc,
            email: data.email,
            numeroTelefono: data.numeroTelefono,

        });

        return await this.clienteRepository.save(cliente);
    }
}