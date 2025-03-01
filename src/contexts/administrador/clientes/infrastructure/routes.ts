import { Router } from "express";
import { CreateClienteController } from "./controllers/CreateClienteController";
import { GetClienteController } from "./controllers/GetClienteController";
import { ListClientesController } from "./controllers/ListClientesController";
import { UpdateClienteController } from "./controllers/UpdateClienteController";
import { clienteBodyValidator } from "./validations/clienteBodyValitdator";
import { container } from "../../../../dependency-injection";

export const registerClientesRoutes = (router: Router) => {
    const createClienteController = container.get<CreateClienteController>(
        'Administrador.Clientes.Controllers.CreateClienteController'
    );
    const getClienteController = container.get<GetClienteController>(
        'Administrador.Clientes.Controllers.GetClienteController'
    );
    const listClientesController = container.get<ListClientesController>(
        'Administrador.Clientes.Controllers.ListClientesController'
    );
    const updateClienteController = container.get<UpdateClienteController>(
        'Administrador.Clientes.Controllers.UpdateClienteController'
    );
    router.get('/clientes', listClientesController.execute.bind(listClientesController));
    router.get('/clientes/:id', getClienteController.execute.bind(getClienteController));
    router.post('/clientes', clienteBodyValidator, createClienteController.execute.bind(createClienteController));
    router.put('/clientes/:id', clienteBodyValidator, updateClienteController.execute.bind(updateClienteController));
};