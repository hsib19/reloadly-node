export const RELOADLY_ENV_BASE_URLS = {
    production: {
        api: 'https://topups.reloadly.com',
        auth: 'https://auth.reloadly.com',
    },
    sandbox: {
        api: 'https://topups-sandbox.reloadly.com',
        auth: 'https://auth-sandbox.reloadly.com',
    },
} as const;

export type ReloadlyEnvironment = keyof typeof RELOADLY_ENV_BASE_URLS;
