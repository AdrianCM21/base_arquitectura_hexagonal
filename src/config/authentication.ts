export interface AuthenticationConfig {
    jwtSecret: string
    expirationTime: string
}

export default ((): AuthenticationConfig => ({
    jwtSecret: process.env.JWT_SECRET || 'secret',
    expirationTime: process.env.JWT_EXPIRATION_TIME || '3600000'
}));