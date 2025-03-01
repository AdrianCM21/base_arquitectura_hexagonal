import { ClienteId } from "../../domain/models/ClienteId";
import { ClienteRepository } from "../../domain/repositories/ClienteRepository";
import { UseCase } from "../../../../shared/application/useCases/UseCase";

export class GetClienteUseCase implements UseCase {
    constructor(
        private readonly clienteRepository: ClienteRepository,
    ) { }
    async execute(id: string) {
        const cliente = await this.clienteRepository.findById(new ClienteId(id));


        return cliente;
    }
}