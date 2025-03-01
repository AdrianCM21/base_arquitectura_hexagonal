import { Router } from "express";
import { container } from "../../../dependency-injection";
import { LoginController } from "./infrastructure/controllers/LoginController";

export const registerUsuarioRoutes = (router: Router) => {
    const loginController = container.get<LoginController>(
        'Administrador.Usuarios.Controllers.LoginController'
    );
    router.post('/login', loginController.execute.bind(loginController));
};