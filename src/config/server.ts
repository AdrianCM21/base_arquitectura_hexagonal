import path from 'path';

export interface ServerConfig {
    port: number
    debugMode: boolean
    basePath: string
    staticPath: string
}

export default (basePath:string): ServerConfig => ({
    port: parseInt(process.env.PORT ||'3000'),
    debugMode: process.env.DEBUG_MODE == "true",
    basePath: basePath,
    staticPath: path.join(basePath, "static")
});