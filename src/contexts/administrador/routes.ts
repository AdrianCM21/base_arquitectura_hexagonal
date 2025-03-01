import { Router } from "express";
import bodyParser from "body-parser";
import { authenticated } from "./usuarios/infrastructure/middleware/authenticated";
import { eventSubscribersRegistry } from "../shared/infrastructure/eventBus/eventSubscribersRegistry";
import { EventBus } from "../shared/domain/events/EventBus";
import { registerClientesRoutes } from "./clientes/infrastructure/routes";

import { container } from "../../dependency-injection";
import { registerUsuarioRoutes } from "./usuarios/routes";

export class AdministradorRoutes {
    readonly router: Router;
    static eventBus: EventBus;
    constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.registerMiddleware();
        this.registerRoutes();
        this.registerAuthMiddleware();
        this.registerProtectedRoutes();
        this.registerDomainEvents();
    }

    private registerMiddleware() {
        this.router.use(bodyParser.json());

    }

    private registerAuthMiddleware() {
        this.router.use(authenticated);
    }

    private registerRoutes() {
        registerUsuarioRoutes(this.router);
    }

    private registerProtectedRoutes() {
        registerClientesRoutes(this.router);

    }

    private registerDomainEvents() {
        const eventBus = container.get<EventBus>('Shared.Events.EventBus');
        AdministradorRoutes.eventBus = eventBus;
        AdministradorRoutes.eventBus.addSubscribers(eventSubscribersRegistry());
    }
}