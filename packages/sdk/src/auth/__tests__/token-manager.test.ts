import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReloadlyAPIError, ReloadlyNetworkError } from '../../errors/reloadly-error.js';
import { TokenManager } from '../../auth/token-manager.js';
import { TokenRequestConfig } from '../../types/commonTypes.js';

beforeEach(() => {
    vi.clearAllMocks();
});

describe('TokenManager', () => {

    const config: TokenRequestConfig = { clientId: 'id', clientSecret: 'secret', environment: 'sandbox' };

    it('returns false when no token', () => {
        const tm = new TokenManager(config);
        expect((tm as any).isTokenValid()).toBe(false);
    });

    it('returns true when token still valid', () => {
        const tm = new TokenManager(config);
        (tm as any).token = {
            access_token: 'abc',
            expires_in: 3600,
            obtained_at: Date.now() / 1000,
        };
        expect((tm as any).isTokenValid()).toBe(true);
    });

    it('getToken returns cached token if valid', async () => {
        const tm = new TokenManager(config);
        (tm as any).token = {
            access_token: 'cached',
            expires_in: 3600,
            obtained_at: Date.now() / 1000,
        };
        const token = await tm.getToken();
        expect(token).toBe('cached');
    });

    it('getToken fetches new token if invalid', async () => {
        const tm = new TokenManager(config);
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ access_token: 'new', expires_in: 3600 }),
        });
        const token = await tm.getToken();
        expect(token).toBe('new');
    });

    it('fetchToken throws ReloadlyAPIError when res not ok', async () => {
        const tm = new TokenManager(config);
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ error: 'bad' }),
        });
        await expect((tm as any).fetchToken()).rejects.toBeInstanceOf(ReloadlyAPIError);
    });

    it('fetchToken throws ReloadlyNetworkError on network failure', async () => {
        const tm = new TokenManager(config);
        global.fetch = vi.fn().mockRejectedValue(new Error('network down'));
        await expect((tm as any).fetchToken()).rejects.toBeInstanceOf(ReloadlyNetworkError);
    });

    it('uses sandbox when environment not provided', async () => {
        const tm = new TokenManager({ clientId: 'id', clientSecret: 'secret' });
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ access_token: 'abc', expires_in: 3600 }),
        });
        const token = await tm.getToken();
        expect(token).toBe('abc');
    });


});
