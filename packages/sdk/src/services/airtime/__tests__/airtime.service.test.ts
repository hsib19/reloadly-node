import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AirtimeService } from '../airtime.service';

describe('AirtimeService', () => {
    let http: { request: ReturnType<typeof vi.fn> };
    let service: AirtimeService;

    beforeEach(() => {
        http = { request: vi.fn().mockResolvedValue({}) };
        service = new AirtimeService({ clientId: 'id', clientSecret: 'secret' } as any, http as any);
    });

    it('createAccessToken calls request with correct path and method', async () => {
        await service.createAccessToken();
        expect(http.request).toHaveBeenCalledWith({ path: '/auth/token', method: 'POST' });
    });

    it('getBalance calls request with correct path', async () => {
        await service.getBalance();
        expect(http.request).toHaveBeenCalledWith({ path: '/accounts/balance' });
    });

    it('getCountryByISO calls request with iso code', async () => {
        await service.getCountryByISO('ID');
        expect(http.request).toHaveBeenCalledWith({ path: '/countries/ID' });
    });

    it('getOperators calls request with query', async () => {
        await service.getOperators('ID');
        expect(http.request).toHaveBeenCalledWith({
            path: '/operators',
            query: { countryCode: 'ID' },
        });
    });

    it('topUp calls request with POST and body', async () => {
        const body = { operatorId: 1, amount: 10 };
        await service.topUp(body as any);
        expect(http.request).toHaveBeenCalledWith({
            path: '/topups',
            method: 'POST',
            body,
        });
    });

    it('asyncTopUp calls request with POST and body', async () => {
        const body = { operatorId: 1, amount: 10 };
        await service.asyncTopUp(body as any);
        expect(http.request).toHaveBeenCalledWith({
            path: '/topups-async',
            method: 'POST',
            body,
        });
    });

    it('getTopUpStatus calls request with transactionId', async () => {
        await service.getTopUpStatus('tx123');
        expect(http.request).toHaveBeenCalledWith({ path: '/topups/tx123/status' });
    });

    it('mnpLookupGET calls request with phone and country', async () => {
        await service.mnpLookupGET('08123', 'ID');
        expect(http.request).toHaveBeenCalledWith({
            path: '/operators/mnp-lookup/phone/08123/countries/ID',
        });
    });

    it('mnpLookupPOST calls request with POST and body', async () => {
        const body = { phone: '08123', countryCode: 'ID' };
        await service.mnpLookupPOST(body as any);
        expect(http.request).toHaveBeenCalledWith({
            path: '/mnp-lookup/operators',
            method: 'POST',
            body,
        });
    });

    it('getCountries calls request with correct path', async () => {
        await service.getCountries();
        expect(http.request).toHaveBeenCalledWith({ path: '/countries' });
    });

    it('getOperatorById calls request with operatorId', async () => {
        await service.getOperatorById(123);
        expect(http.request).toHaveBeenCalledWith({ path: '/operators/123' });
    });

    it('autoDetectOperator calls request with phone and iso code', async () => {
        await service.autoDetectOperator('08123', 'ID');
        expect(http.request).toHaveBeenCalledWith({
            path: '/operators/auto-detect/phone/08123/countries/ID',
        });
    });

    it('getOperatorByISOId calls request with country code', async () => {
        await service.getOperatorByISOId('ID');
        expect(http.request).toHaveBeenCalledWith({ path: '/operators/countries/ID' });
    });

    it('fetchFXRate calls request with fx-rate path', async () => {
        await service.fetchFXRate();
        expect(http.request).toHaveBeenCalledWith({ path: '/operators/fx-rate' });
    });

    it('getCommissions calls request with commissions path', async () => {
        await service.getCommissions();
        expect(http.request).toHaveBeenCalledWith({ path: '/operators/commissions' });
    });

    it('getCommissionByOperatorId calls request with operatorId', async () => {
        await service.getCommissionByOperatorId(456);
        expect(http.request).toHaveBeenCalledWith({ path: '/operators/456/commissions' });
    });

    it('getPromotions calls request with promotions path', async () => {
        await service.getPromotions();
        expect(http.request).toHaveBeenCalledWith({ path: '/promotions' });
    });

    it('getPromotionById calls request with promotionId', async () => {
        await service.getPromotionById(789);
        expect(http.request).toHaveBeenCalledWith({ path: '/promotions/789' });
    });

    it('getPromotionsByISO calls request with country code', async () => {
        await service.getPromotionsByISO('ID');
        expect(http.request).toHaveBeenCalledWith({ path: '/promotions/country-codes/ID' });
    });

    it('getPromotionsByOperatorId calls request with operatorId', async () => {
        await service.getPromotionsByOperatorId(321);
        expect(http.request).toHaveBeenCalledWith({ path: '/promotions/operators/321' });
    });

    it('getTransactions calls request with correct path', async () => {
        await service.getTransactions();
        expect(http.request).toHaveBeenCalledWith({
            path: '/topups/reports/transactions',
        });
    });

    it('getTransactionById calls request with transactionId', async () => {
        await service.getTransactionById('tx123');
        expect(http.request).toHaveBeenCalledWith({
            path: '/topups/reports/transactions/tx123',
        });
    });

});
