import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("usuarios")
export class Usuario {
    @PrimaryColumn()
    id: string;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    password: string;

}