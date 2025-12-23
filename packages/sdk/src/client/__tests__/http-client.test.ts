import { TokenManager } from '../../auth/token-manager.js';
import { HttpClient } from '../../client/http-client.js';
import { ReloadlyConfig } from '../../client/reloadly-client.js';
import { ReloadlyAPIError, ReloadlyNetworkError } from '../../errors/reloadly-error.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// dummy config
const config: ReloadlyConfig = { environment: 'sandbox' } as any;

describe('HttpClient', () => {
    let client: HttpClient;

    beforeEach(() => {
        client = new HttpClient(config);
    });

    it('returns custom baseUrl if provided', () => {
        const client = new HttpClient({ environment: 'sandbox' } as any, undefined, 'http://custom');
        expect(client['getBaseUrl']()).toBe('http://custom');
    });

    it('returns auth base url when useAuthBaseUrl = true', () => {
        const client = new HttpClient({ environment: 'sandbox' } as any);
        const url = client['getBaseUrl'](true);
        expect(url).toContain('auth');
    });

    it('returns airtime base url when useAuthBaseUrl = false', () => {
        const client = new HttpClient({ environment: 'sandbox' } as any);
        const url = client['getBaseUrl'](false);
        expect(url).toContain('https://topups-sandbox.reloadly.com');
    });

    it('should build URL with query params', async () => {
        // mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        });
        (globalThis as any).fetch = mockFetch;

        const res = await client.request<{ success: boolean }>({
            path: '/test',
            query: { foo: 'bar', baz: 123 },
        });

        expect(res.success).toBe(true);
        expect(mockFetch).toHaveBeenCalled();
        const calledUrl = new URL(mockFetch.mock.calls[0][0]);
        expect(calledUrl.searchParams.get('foo')).toBe('bar');
        expect(calledUrl.searchParams.get('baz')).toBe('123');
    });

    it('falls back to "sandbox" when environment is undefined', () => {
        const client = new HttpClient({} as any);
        const url = client['getBaseUrl']();
        expect(url).toContain('sandbox');
    });

    it('should throw ReloadlyAPIError on non-ok response', async () => {
        (globalThis as any).fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ error: 'bad request' }),
        });

        await expect(
            client.request<{ error: string }>({ path: '/fail' })
        ).rejects.toBeInstanceOf(ReloadlyAPIError);
    });

    it('should attach Authorization header if TokenManager provided', async () => {
        const tokenManager = { getToken: vi.fn().mockResolvedValue('fake-token') } as unknown as TokenManager;
        client = new HttpClient(config, tokenManager);

        (globalThis as any).fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        });

        await client.request({ path: '/auth' });
        const headers = (globalThis as any).fetch.mock.calls[0][1].headers;
        expect(headers.Authorization).toBe('Bearer fake-token');
    });

    it('should wrap network errors in ReloadlyNetworkError', async () => {
        (globalThis as any).fetch = vi.fn().mockRejectedValue(new Error('network down'));

        await expect(
            client.request({ path: '/network' })
        ).rejects.toBeInstanceOf(ReloadlyNetworkError);
    });

    it('skips query params with undefined values', async () => {
        const client = new HttpClient({ environment: 'sandbox' } as any);

        (globalThis as any).fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        });

        await client.request({
            path: '/test',
            query: { foo: undefined, bar: 'baz' },
        });

        const calledUrl = new URL((globalThis as any).fetch.mock.calls[0][0]);
        expect(calledUrl.searchParams.has('foo')).toBe(false);
        expect(calledUrl.searchParams.get('bar')).toBe('baz');
    });

    it('stringifies body when provided', async () => {
        const client = new HttpClient({ environment: 'sandbox' } as any);

        (globalThis as any).fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        });

        await client.request({
            path: '/with-body',
            method: 'POST',
            body: { foo: 'bar' },
        });

        const fetchOpts = (globalThis as any).fetch.mock.calls[0][1];
        expect(fetchOpts.body).toBe(JSON.stringify({ foo: 'bar' }));
    });

    it('sets body to undefined when not provided', async () => {
        const client = new HttpClient({ environment: 'sandbox' } as any);

        (globalThis as any).fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        });

        await client.request({
            path: '/no-body',
            method: 'POST',
        });

        const fetchOpts = (globalThis as any).fetch.mock.calls[0][1];
        expect(fetchOpts.body).toBeUndefined();
    });

});
