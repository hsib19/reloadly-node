import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Reloadly, ReloadlyConfig } from '../reloadly-client.js';
import { TokenManager } from '../../auth/token-manager.js';
import { HttpClient } from '../../client/http-client.js';
import { AirtimeService } from '../../services/airtime/airtime.service.js';

vi.mock('@auth/token-manager', () => ({
    TokenManager: vi.fn(),
}));

vi.mock('@client/http-client', () => ({
    HttpClient: vi.fn(),
}));

vi.mock('@services/airtime/airtime.service', () => ({
    AirtimeService: vi.fn(),
}));

vi.mock('@services/giftcards/giftcards.service', () => ({
    GiftCardService: vi.fn(),
}));

vi.mock('@services/utility-payments/utility-payments.service', () => ({
    UtilityPaymentsService: vi.fn(),
}));

vi.mock('@utils/env', () => ({
    getGiftCardApiBaseUrl: vi.fn().mockReturnValue('https://giftcards.base'),
    getUtilityApiBaseUrl: vi.fn().mockReturnValue('https://utility.base'),
}));

describe('Reloadly client', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes TokenManager with sandbox fallback', () => {
        const config = { clientId: 'id', clientSecret: 'secret' };
        new Reloadly(config);

        expect(TokenManager).toHaveBeenCalledWith({
            clientId: 'id',
            clientSecret: 'secret',
            environment: 'sandbox',
        });
    });

    it('initializes TokenManager with provided environment', () => {
        const config: ReloadlyConfig = {
            clientId: 'id',
            clientSecret: 'secret',
            environment: 'production',
        };
        new Reloadly(config);

        expect(TokenManager).toHaveBeenCalledWith({
            clientId: 'id',
            clientSecret: 'secret',
            environment: 'production',
        });
    });

    it('creates HttpClient and services with correct arguments', () => {
        const config = { clientId: 'id', clientSecret: 'secret' };
        new Reloadly(config);

        expect(HttpClient).toHaveBeenCalledTimes(3);

        expect(AirtimeService).toHaveBeenCalledWith(config, expect.any(Object));
    });

});
