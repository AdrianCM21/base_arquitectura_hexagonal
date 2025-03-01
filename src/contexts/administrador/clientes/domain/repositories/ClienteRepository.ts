import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { Cliente } from "../models/Cliente";
import { ClienteId } from "../models/ClienteId";

export interface ClienteRepository {
    searchByCriteria(criteria: Criteria): Promise<Cliente | Array<Cliente>>;
    findById(id: ClienteId): Promise<Cliente>;
    findAll(): Promise<Array<Cliente>>;
    save(cliente: Cliente): Promise<Cliente>;
}