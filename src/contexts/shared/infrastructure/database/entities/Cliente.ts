import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from "typeorm";

export enum ClienteTipo {
    FISICA = "fisica",
    JURIDICA = "juridica"
}

@Entity("clientes")
@Unique(["ruc"])
export class Cliente extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    nombre: string;

    @Column()
    ruc: string;

    @Column()
    email: string;

    @Column({ name: 'numero_telefono' })
    numeroTelefono: string;

}