import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UtilityPaymentsService } from '../utility-payments.service';

describe('UtilityPaymentsService', () => {
    let http: { request: ReturnType<typeof vi.fn> };
    let service: UtilityPaymentsService;

    beforeEach(() => {
        http = { request: vi.fn().mockResolvedValue({}) };
        service = new UtilityPaymentsService(
            { clientId: 'id', clientSecret: 'secret' } as any,
            http as any
        );
    });

    it('createAccessToken calls request with correct path and method', async () => {
        await service.createAccessToken();
        expect(http.request).toHaveBeenCalledWith({
            path: '/oauth/token',
            method: 'POST',
            useAuthBaseUrl: true,
        });
    });

    it('getBalance calls request with /balance', async () => {
        await service.getBalance();
        expect(http.request).toHaveBeenCalledWith({ path: '/balance' });
    });

    it('getBillers calls request with /billers', async () => {
        await service.getBillers();
        expect(http.request).toHaveBeenCalledWith({ path: '/billers' });
    });

    it('payBill calls request with POST and body', async () => {
        const body = { billerId: '123', amount: 100 };
        await service.payBill(body as any);
        expect(http.request).toHaveBeenCalledWith({
            path: '/pay',
            method: 'POST',
            body,
        });
    });

    it('getTransactions calls request with /transactions', async () => {
        await service.getTransactions();
        expect(http.request).toHaveBeenCalledWith({ path: '/transactions' });
    });

    it('getTransactionById calls request with id', async () => {
        await service.getTransactionById('tx123');
        expect(http.request).toHaveBeenCalledWith({ path: '/transactions/tx123' });
    });
});
