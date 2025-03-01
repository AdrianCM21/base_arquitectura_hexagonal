import { NextFunction, Request, Response } from "express";
import { GetClienteUseCase } from "../../application/useCases/GetClienteUseCase";
import { OperationNotAllowed } from "../../../../shared/application/exceptions/OperationNotAllowed";
import { Forbidden } from "../../../../shared/infrastructure/exceptions/http/Forbidden";
import { ClienteNotFound } from "../../domain/exceptions/ClienteNotFound";
import { NotFound } from "../../../../shared/infrastructure/exceptions/http/NotFound";

export class GetClienteController {
    constructor(readonly useCase: GetClienteUseCase) { }

    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const cliente = await this.useCase.execute(id);
            return res.json(cliente.toPrimitives());
        } catch (e) {
            if (e instanceof OperationNotAllowed)
                return next(new Forbidden());
            if (e instanceof ClienteNotFound)
                return next(new NotFound("No se encontró el cliente"));
            return next(e);
        }
    }
}