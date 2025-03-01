export interface SecurityConfig {
    encriptionKey: string
    initialVector: string
}

export default ((): SecurityConfig => ({
    encriptionKey: process.env.ENCRYPTION_KEY!,
    initialVector: process.env.INITIAL_ENCRYPTION_VECTOR!
}));