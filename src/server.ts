import { Application } from "express";
import express from 'express';
import { config } from "./config";
import { AdministradorRoutes } from "./contexts/administrador/routes";
import { DatabaseProvider } from "./contexts/shared/infrastructure/database/DatabaseProvider";
import { errorHandler } from "./contexts/shared/infrastructure/middleware/errorHandler";
import rateLimit from "express-rate-limit";

export class Server {
    readonly app: Application;
    readonly port: number;

    constructor() {
        this.app = express();
        this.port = config.server.port;
        this.registerMiddleware();
        this.registerContexts();
        this.registerErrorHandling();
    }

    async init(onStart: () => void) {
        await DatabaseProvider.init();
        this.app.listen(this.port, onStart);
    }

    registerMiddleware() {
        this.app.use(rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: 'draft-7',
            legacyHeaders: false,
        }));
    }

    registerContexts() {
        this.app.use("/administrador", (new AdministradorRoutes()).router);
    }

    registerErrorHandling() {
        this.app.use(errorHandler);
    }
}