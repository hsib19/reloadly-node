import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Reloadly } from '../reloadly-client.js';
import { ACCEPT_HEADERS } from '../../constants/accept-headers.js';

const tokenManagerMock = vi.fn();
vi.mock('../../auth/token-manager.js', () => ({
    TokenManager: vi.fn(function (this: { getAccessToken?: unknown }, args) {
        tokenManagerMock(args);
        this.getAccessToken = vi.fn();
    }),
}));

const httpClientMock = vi.fn();
vi.mock('../../client/http-client.js', () => ({
    HttpClient: vi.fn(function (...args) {
        httpClientMock(args);
    }),
}));

const airtimeServiceMock = vi.fn();
const giftCardServiceMock = vi.fn();
const utilityServiceMock = vi.fn();

vi.mock('../../services/airtime/airtime.service.js', () => ({
    AirtimeService: vi.fn(function (config, client) {
        airtimeServiceMock(config, client);
        return { type: 'airtime' };
    }),
}));

vi.mock('../../services/giftcards/giftcards.service.js', () => ({
    GiftCardService: vi.fn(function (config, client) {
        giftCardServiceMock(config, client);
        return { type: 'giftcards' };
    }),
}));

vi.mock('../../services/utility-payments/utility-payments.service.js', () => ({
    UtilityPaymentsService: vi.fn(function (config, client) {
        utilityServiceMock(config, client);
        return { type: 'utilities' };
    }),
}));

vi.mock('../../utils/env.js', () => ({
    getAirtimeApiBaseUrl: vi.fn(() => 'https://airtime.api'),
    getGiftCardApiBaseUrl: vi.fn(() => 'https://giftcards.api'),
    getUtilityApiBaseUrl: vi.fn(() => 'https://utilities.api'),
    getAudience: vi.fn((_env, service) => `${service}-audience`),
}));

describe('Reloadly', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize token managers with correct audiences', () => {
        new Reloadly({
            clientId: 'id',
            clientSecret: 'secret',
            environment: 'sandbox',
        });

        expect(tokenManagerMock).toHaveBeenCalledTimes(3);
        expect(tokenManagerMock).toHaveBeenCalledWith(
            expect.objectContaining({ audience: 'airtime-audience' })
        );
        expect(tokenManagerMock).toHaveBeenCalledWith(
            expect.objectContaining({ audience: 'giftCards-audience' })
        );
        expect(tokenManagerMock).toHaveBeenCalledWith(
            expect.objectContaining({ audience: 'utilities-audience' })
        );
    });

    it('should create http clients with correct base urls and headers', () => {
        new Reloadly({
            clientId: 'id',
            clientSecret: 'secret',
            environment: 'sandbox',
        });

        expect(httpClientMock).toHaveBeenCalledTimes(3);

        expect(httpClientMock).toHaveBeenCalledWith(
            expect.arrayContaining(['https://airtime.api', ACCEPT_HEADERS.airtime])
        );

        expect(httpClientMock).toHaveBeenCalledWith(
            expect.arrayContaining(['https://giftcards.api', ACCEPT_HEADERS.giftcards])
        );

        expect(httpClientMock).toHaveBeenCalledWith(
            expect.arrayContaining(['https://utilities.api', ACCEPT_HEADERS.utilities])
        );
    });

    it('should expose airtime, giftcards, and utilityPayments services', () => {
        const reloadly = new Reloadly({
            clientId: 'id',
            clientSecret: 'secret',
        });

        expect(reloadly.airtime).toBeDefined();
        expect(reloadly.giftcards).toBeDefined();
        expect(reloadly.utilityPayments).toBeDefined();
    });
});
