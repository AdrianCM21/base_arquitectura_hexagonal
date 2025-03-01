import { NextFunction, Request, Response } from "express";
import { UpdateClienteUseCase } from "../../application/useCases/UpdateClienteUseCase";
import { OperationNotAllowed } from "../../../../shared/application/exceptions/OperationNotAllowed";
import { Forbidden } from "../../../../shared/infrastructure/exceptions/http/Forbidden";
import { ClienteNotFound } from "../../domain/exceptions/ClienteNotFound";
import { NotFound } from "../../../../shared/infrastructure/exceptions/http/NotFound";
import { ClienteDuplicated } from "../../domain/exceptions/ClienteDuplicated";
import { BadRequest } from "../../../../shared/infrastructure/exceptions/http/BadRequest";

export class UpdateClienteController {
    constructor(readonly useCase: UpdateClienteUseCase) { }
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { nombre, ruc, email, numeroTelefono } = req.body;

            const cliente = await this.useCase.execute({ id, nombre, ruc, email, numeroTelefono });

            return res.json(cliente.toPrimitives());
        } catch (e) {
            if (e instanceof OperationNotAllowed)
                return next(new Forbidden());
            if (e instanceof ClienteNotFound)
                return next(new NotFound("No se encontró el cliente."));
            if (e instanceof ClienteDuplicated)
                return next(new BadRequest("Ya existe un cliente con ese ruc."));
            if (e instanceof ClienteDuplicated)
                return next(new BadRequest("Ya existe un cliente con ese ruc."));
            return next(e);
        }
    }
}