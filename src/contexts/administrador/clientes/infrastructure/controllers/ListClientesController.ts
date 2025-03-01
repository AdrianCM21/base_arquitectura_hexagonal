import { NextFunction, Request, Response } from "express";
import { ListClientesUseCase } from "../../application/useCases/ListClientesUseCase";

export class ListClientesController {

    constructor(readonly useCase: ListClientesUseCase) { }
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const clientes = await this.useCase.execute();
            const response = clientes.map(cliente => cliente.toPrimitives());

            return res.json(response);
        } catch (e) {
            return next(e);
        }
    }
}