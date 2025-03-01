import { AggregateRoot } from "../../../../shared/domain/AggregateRoot";
import { ClienteEmail } from "./ClienteEmail";
import { ClienteId } from "./ClienteId";
import { ClienteNombre } from "./ClienteNombre";
import { ClienteNumeroTelefono } from "./ClienteNumeroTelefono";
import { ClienteRuc } from "./ClienteRuc";


export type ClientePrimitives = {
    id: string,
    nombre: string,
    ruc: string,
    email: string,
    numeroTelefono: string
}

export class Cliente extends AggregateRoot {
    readonly id: ClienteId;
    readonly nombre: ClienteNombre;
    readonly ruc: ClienteRuc;
    readonly email: ClienteEmail;
    readonly numeroTelefono: ClienteNumeroTelefono;


    constructor(
        id: ClienteId,
        nombre: ClienteNombre,
        ruc: ClienteRuc,
        email: ClienteEmail,
        numeroTelefono: ClienteNumeroTelefono

    ) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.ruc = ruc;
        this.email = email;
        this.numeroTelefono = numeroTelefono;
    }

    static fromPrimitives(data: ClientePrimitives) {
        return new Cliente(
            new ClienteId(data.id),
            new ClienteNombre(data.nombre),
            new ClienteRuc(data.ruc),
            new ClienteEmail(data.email),
            new ClienteNumeroTelefono(data.numeroTelefono)
        );
    }

    toPrimitives(): ClientePrimitives {
        return {
            id: this.id.value,
            nombre: this.nombre.value,
            ruc: this.ruc.value,
            email: this.email.value,
            numeroTelefono: this.numeroTelefono.value
        };
    }

}