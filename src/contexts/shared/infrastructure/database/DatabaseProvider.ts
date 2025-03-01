import { DataSource } from "typeorm";
import { config } from "../../../../config";
import path from "path";

export class DatabaseProvider {
    public static datasource: DataSource | null = null;

    public static async init() {
        try {
            
            this.datasource = new DataSource({
                type: config.database.driver,
                host: config.database.host,
                port: config.database.port,
                username: config.database.username,
                password: config.database.password,
                database: config.database.database,
                entities: [path.join(__dirname, 'entities/*.{js,ts}')],
                migrations: [path.join(__dirname, 'migrations/*.{js,ts}')],
                insecureAuth: true
            });
    
            await this.datasource.initialize();
            console.log("Base de datos inicializada.");
        }catch(err){
            console.error("Error al inicializar la base de datos", err);
        }
    }
}