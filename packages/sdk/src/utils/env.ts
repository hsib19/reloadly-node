import { RELOADLY_ENV_BASE_URLS, ReloadlyEnvironment } from '@constants/environments';

export function getApiBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].api;
}

export function getAuthBaseUrl(environment: ReloadlyEnvironment) {
    return RELOADLY_ENV_BASE_URLS[environment].auth;
}
