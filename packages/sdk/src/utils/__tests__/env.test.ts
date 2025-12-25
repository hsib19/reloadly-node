import { RELOADLY_ENV_BASE_URLS } from '../../constants/environments.js';
import { getAirtimeApiBaseUrl, getAudience, getAuthBaseUrl, getGiftCardApiBaseUrl, getUtilityApiBaseUrl } from '../../utils/env.js';
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

describe('getAudience', () => {
    it('returns airtime audience by default', () => {
        const result = getAudience('sandbox');

        expect(result).toBe(
            RELOADLY_ENV_BASE_URLS.sandbox.airtime
        );
    });

    it('returns giftCards audience', () => {
        const result = getAudience('sandbox', 'giftCards');

        expect(result).toBe(
            RELOADLY_ENV_BASE_URLS.sandbox.giftCards
        );
    });

    it('returns utilities audience', () => {
        const result = getAudience('sandbox', 'utilities');

        expect(result).toBe(
            RELOADLY_ENV_BASE_URLS.sandbox.utilities
        );
    });

    it('returns production audience', () => {
        const result = getAudience('production', 'airtime');

        expect(result).toBe(
            RELOADLY_ENV_BASE_URLS.production.airtime
        );
    });
});
