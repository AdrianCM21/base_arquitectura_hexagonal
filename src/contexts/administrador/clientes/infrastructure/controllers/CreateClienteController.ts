import { NextFunction, Request, Response } from "express";
import { CreateClienteUseCase } from "../../application/useCases/CreateClienteUseCase";
import { ClienteDuplicated } from "../../domain/exceptions/ClienteDuplicated";
import { BadRequest } from "../../../../shared/infrastructure/exceptions/http/BadRequest";

export class CreateClienteController {

    constructor(readonly useCase: CreateClienteUseCase) { }

    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { nombre, ruc, email, numeroTelefono } = req.body;

            const cliente = await this.useCase.execute({ nombre, ruc, email, numeroTelefono });

            return res.json(cliente.toPrimitives());
        } catch (e) {
            if (e instanceof ClienteDuplicated)
                next(new BadRequest("El cliente ya existe"));
            return next(e);
        }
    }
}