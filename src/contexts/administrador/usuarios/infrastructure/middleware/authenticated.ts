import { NextFunction, Request, Response } from "express";
import { Unauthenticated } from "../../../../shared/infrastructure/exceptions/http/Unauthenticated";
import asyncHandler from "express-async-handler";
import { container } from "../../../../../dependency-injection";
import { AuthenticationService } from "../../application/services/AuthenticationService";

export const authenticated = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const autheticationService = container.get<AuthenticationService>(
            'Administrador.Services.AuthenticationService'
        );

        if (!req.headers.authorization)
            return next(new Unauthenticated("Usuario no autenticado"));

        const usuario = await autheticationService.tryGetAuthenticatedUser(req.headers.authorization);
        req.usuario = usuario;
        return next();
    }
);