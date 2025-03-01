import { ClienteRepository } from "../../domain/repositories/ClienteRepository";
import { UseCase } from "../../../../shared/application/useCases/UseCase";

export class ListClientesUseCase implements UseCase {
    constructor(
        private readonly clienteRepository: ClienteRepository,
    ) { }
    async execute() {
        const clientes = await this.clienteRepository.findAll();
        return clientes;
    }
}