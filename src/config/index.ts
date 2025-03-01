import server, { ServerConfig } from './server';
import database, { DatabaseConfig } from './database';
import dotenv from 'dotenv';
import authentication, { AuthenticationConfig } from './authentication';
import security, { SecurityConfig } from './security';


export interface Config {
    server: ServerConfig
    database: DatabaseConfig
    authentication: AuthenticationConfig
    security: SecurityConfig

}
export let config: Config;

export const initConfig = (basePath: string) => {
    dotenv.config();
    const serverConfig = server(basePath);
    const databaseConfig = database();
    const authenticationConfig = authentication();
    const securityConfig = security();

    config = {
        server: serverConfig,
        database: databaseConfig,
        authentication: authenticationConfig,
        security: securityConfig,
    };
};


