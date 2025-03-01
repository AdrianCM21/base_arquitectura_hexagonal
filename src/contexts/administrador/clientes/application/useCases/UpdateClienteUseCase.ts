import { Cliente } from "../../domain/models/Cliente";
import { ClienteEmail } from "../../domain/models/ClienteEmail";
import { ClienteId } from "../../domain/models/ClienteId";
import { ClienteNombre } from "../../domain/models/ClienteNombre";
import { ClienteRepository } from "../../domain/repositories/ClienteRepository";
import { ClienteRuc } from "../../domain/models/ClienteRuc";
import { UseCase } from "../../../../shared/application/useCases/UseCase";
import { ClienteNumeroTelefono } from "../../domain/models/ClienteNumeroTelefono";

export class UpdateClienteUseCase implements UseCase {
    constructor(
        private readonly clienteRepository: ClienteRepository,
    ) { }
    async execute(data: { id: string, nombre: string, ruc: string, email: string, numeroTelefono: string }) {
        const cliente = await this.clienteRepository.findById(new ClienteId(data.id));

        const updated = new Cliente(
            cliente.id,
            new ClienteNombre(data.nombre),
            new ClienteRuc(data.ruc),
            new ClienteEmail(data.email),
            new ClienteNumeroTelefono(data.numeroTelefono)
        );
        return await this.clienteRepository.save(updated);
    }
}