import { RELOADLY_ENV_BASE_URLS, ReloadlyEnvironment } from '@constants/environments';

export function getAirtimeApiBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].airtime;
}

export function getGiftCardApiBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].giftCards;
}

export function getAuthBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].auth;
}
