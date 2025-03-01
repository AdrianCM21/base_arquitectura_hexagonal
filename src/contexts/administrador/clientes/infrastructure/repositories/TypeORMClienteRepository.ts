import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { DatabaseProvider } from "../../../../shared/infrastructure/database/DatabaseProvider";
import { Cliente } from "../../domain/models/Cliente";
import { Cliente as ClienteEntity } from "../../../../shared/infrastructure/database/entities/Cliente";
import { ClienteId } from "../../domain/models/ClienteId";
import { ClienteRepository } from "../../domain/repositories/ClienteRepository";

import { ClienteNotFound } from "../../domain/exceptions/ClienteNotFound";
import { QueryFailedError } from "typeorm";
import { ClienteDuplicated } from "../../domain/exceptions/ClienteDuplicated";

export class TypeORMClienteRepository implements ClienteRepository {
    async searchByCriteria(criteria: Criteria): Promise<Cliente | Cliente[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: ClienteId): Promise<Cliente> {
        const clienteRepository = DatabaseProvider.datasource!.getRepository(ClienteEntity);
        const cliente = await clienteRepository.findOneBy({ id: id.value });

        if (!cliente)
            throw new ClienteNotFound();

        return await Cliente.fromPrimitives(cliente);
    }

    async findAll(): Promise<Cliente[]> {
        const clienteRepository = DatabaseProvider.datasource!.getRepository(ClienteEntity);

        const clientes = await clienteRepository.find();

        return clientes.map(clienteEntity => Cliente.fromPrimitives(clienteEntity));
    }

    async save(cliente: Cliente): Promise<Cliente> {
        try {
            const clienteRepository = DatabaseProvider.datasource!.getRepository(ClienteEntity);

            await clienteRepository.save(cliente.toPrimitives() as any);

            return await this.findById(cliente.id);
        } catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === 'ER_DUP_ENTRY')
                throw new ClienteDuplicated("Este cliente ya existe");
            throw error;
        }
    }

}