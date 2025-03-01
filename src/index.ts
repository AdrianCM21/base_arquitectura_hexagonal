import { initConfig } from "./config";
import { Usuario } from "./contexts/administrador/usuarios/domain/models/Usuario";
import { buildContainer } from "./dependency-injection";
import { Server } from "./server";
import 'reflect-metadata';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        //Extendemos la clase de Request para añadir nuestras nuestros 
        //atributos personalizado y no tener problemas con typescript
        interface Request {
            usuario?: Usuario | null;
        }
    }
}

initConfig(process.cwd());
buildContainer().then(() => {
    const server = new Server();
    server.init(() => {
        console.log(`Servidor corriendo en el puerto ${server.port}`);
    });
});
