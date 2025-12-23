export const RELOADLY_ENV_BASE_URLS = {
    production: {
        airtime: 'https://topups.reloadly.com',
        auth: 'https://auth.reloadly.com',
        giftCards: 'https://giftcards.reloadly.com',
        utilities: 'https://utilities.reloadly.com'
    },
    sandbox: {
        airtime: 'https://topups-sandbox.reloadly.com',
        auth: 'https://auth-sandbox.reloadly.com',
        giftCards: 'https://giftcards-sandbox.reloadly.com',
        utilities: 'https://utilities-sandbox.reloadly.com'
    },
} as const;

export type ReloadlyEnvironment = keyof typeof RELOADLY_ENV_BASE_URLS;
