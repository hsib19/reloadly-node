export const ACCEPT_HEADERS = {
    airtime: 'application/com.reloadly.topups-v1+json',
    giftcards: 'application/com.reloadly.giftcards-v1+json',
    utilities: 'application/com.reloadly.utilities-v1+json',
    auth: 'application/json',
} as const;

export type ReloadlyApiType = keyof typeof ACCEPT_HEADERS;
