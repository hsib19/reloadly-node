import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GiftCardService } from '../giftcards.service.js';

describe('GiftCardService', () => {
    let http: { request: ReturnType<typeof vi.fn> };
    let service: GiftCardService;

    beforeEach(() => {
        http = { request: vi.fn().mockResolvedValue({}) };
        service = new GiftCardService({ clientId: 'id', clientSecret: 'secret' } as any, http as any);
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

    it('getCategories calls request with /categories', async () => {
        await service.getCategories();
        expect(http.request).toHaveBeenCalledWith({ path: '/categories' });
    });

    it('getCountries calls request with /countries', async () => {
        await service.getCountries();
        expect(http.request).toHaveBeenCalledWith({ path: '/countries' });
    });

    it('getCountryByISO calls request with iso code', async () => {
        await service.getCountryByISO('ID');
        expect(http.request).toHaveBeenCalledWith({ path: '/countries/ID' });
    });

    it('getProducts calls request with /products', async () => {
        await service.getProducts();
        expect(http.request).toHaveBeenCalledWith({ path: '/products' });
    });

    it('getProductById calls request with productId', async () => {
        await service.getProductById(123);
        expect(http.request).toHaveBeenCalledWith({ path: '/products/123' });
    });

    it('getProductByISO calls request with isoCode query', async () => {
        await service.getProductByISO('US');
        expect(http.request).toHaveBeenCalledWith({ path: '/products?isoCode=US' });
    });

    it('getRedeemInstructions calls request with /redeem-instructions', async () => {
        await service.getRedeemInstructions();
        expect(http.request).toHaveBeenCalledWith({ path: '/redeem-instructions' });
    });

    it('getRedeemInstructionsByProductId calls request with productId', async () => {
        await service.getRedeemInstructionsByProductId(456);
        expect(http.request).toHaveBeenCalledWith({ path: '/products/456/redeem-instructions' });
    });

    it('fetchFXRate calls request with /fx-rate', async () => {
        await service.fetchFXRate();
        expect(http.request).toHaveBeenCalledWith({ path: '/fx-rate' });
    });

    it('getDiscounts calls request with /discounts', async () => {
        await service.getDiscounts();
        expect(http.request).toHaveBeenCalledWith({ path: '/discounts' });
    });

    it('getDiscountByProductId calls request with productId', async () => {
        await service.getDiscountByProductId(789);
        expect(http.request).toHaveBeenCalledWith({ path: '/products/789/discounts' });
    });

    it('getTransactions calls request with /reports/transactions', async () => {
        await service.getTransactions();
        expect(http.request).toHaveBeenCalledWith({ path: '/reports/transactions' });
    });

    it('getTransactionById calls request with transactionId', async () => {
        await service.getTransactionById('tx123');
        expect(http.request).toHaveBeenCalledWith({ path: '/reports/transactions/tx123' });
    });

    it('orderGiftCard calls request with POST and body', async () => {
        const body = { productId: 1, amount: 50 };
        await service.orderGiftCard(body as any);
        expect(http.request).toHaveBeenCalledWith({
            path: '/orders',
            method: 'POST',
            body,
        });
    });

    it('getRedeemCode calls request with transactionId', async () => {
        await service.getRedeemCode('tx999');
        expect(http.request).toHaveBeenCalledWith({ path: '/orders/transactions/tx999/cards' });
    });
});
