import 'dotenv/config'

type ReloadlyEnv = 'sandbox' | 'production'

function requireEnv(key: string): string {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value
}

export const env = {
    reloadly: {
        clientId: requireEnv('RELOADLY_CLIENT_ID'),
        clientSecret: requireEnv('RELOADLY_CLIENT_SECRET'),
        environment: (process.env.RELOADLY_ENV as ReloadlyEnv) ?? 'sandbox',
    },
} as const
