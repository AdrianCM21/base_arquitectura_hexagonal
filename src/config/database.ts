export interface DatabaseConfig {
    driver: any
    host: string
    port: number
    database: string
    username: string
    password: string
}

export default ((): DatabaseConfig => ({
    driver: process.env.DB_DRIVER || 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    database: process.env.DB_NAME || 'test',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
}));