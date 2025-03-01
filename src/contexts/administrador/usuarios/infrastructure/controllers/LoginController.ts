import { NextFunction, Request, Response } from "express";
import { LoginUseCase } from "../../application/useCases/LoginUseCase";
import { UsuarioNotFound } from "../../domain/exceptions/UsuarioNotFound";
import { Unauthenticated } from "../../../../shared/infrastructure/exceptions/http/Unauthenticated";
import { IncorrectAuthenticationData } from "../../domain/exceptions/IncorrectAuthenticationData";

export class LoginController {

    constructor(readonly useCase: LoginUseCase) { }

    public async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { token, usuario } = await this.useCase.execute(email, password);

            return res.json({
                token: token,
                usuario: usuario.toPrimitives()
            });
        } catch (error) {

            if (error instanceof UsuarioNotFound || error instanceof IncorrectAuthenticationData)
                return next(new Unauthenticated(error.message));
            return next(error);

        }
    }
}