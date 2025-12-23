import { RELOADLY_ENV_BASE_URLS, ReloadlyEnvironment } from '../constants/environments.js';

export function getAirtimeApiBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].airtime;
}

export function getGiftCardApiBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].giftCards;
}

export function getUtilityApiBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].utilities;
}

export function getAuthBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].auth;
}

export function getAudience(
    environment: ReloadlyEnvironment,
    service: 'airtime' | 'giftCards' | 'utilities' = 'airtime'
): string {
    return RELOADLY_ENV_BASE_URLS[environment][service];
}
