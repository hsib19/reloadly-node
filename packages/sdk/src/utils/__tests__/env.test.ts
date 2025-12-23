import { RELOADLY_ENV_BASE_URLS } from '@constants/environments';
import { getAirtimeApiBaseUrl, getAuthBaseUrl, getGiftCardApiBaseUrl, getUtilityApiBaseUrl } from '@utils/env';
import { describe, it, expect } from 'vitest';

describe('env utils', () => {
    it('returns airtime base url', () => {
        expect(getAirtimeApiBaseUrl('sandbox')).toBe(RELOADLY_ENV_BASE_URLS.sandbox.airtime);
    });

    it('returns giftcard base url', () => {
        expect(getGiftCardApiBaseUrl('sandbox')).toBe(RELOADLY_ENV_BASE_URLS.sandbox.giftCards);
    });

    it('returns utility base url', () => {
        expect(getUtilityApiBaseUrl('production')).toBe(RELOADLY_ENV_BASE_URLS.production.utilities);
    });

    it('returns auth base url', () => {
        expect(getAuthBaseUrl('production')).toBe(RELOADLY_ENV_BASE_URLS.production.auth);
    });
});
