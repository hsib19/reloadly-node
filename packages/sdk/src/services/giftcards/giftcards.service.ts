import { ReloadlyConfig } from '@client/reloadly-client';
import { HttpClient } from '@client/http-client';
import type {
    OAuthToken,
    BalanceResult,
    Category,
    Country,
    Product,
    RedeemInstructions,
    FXRate,
    Discount,
    Transaction,
    OrderGiftCardOptions,
    OrderGiftCardResult,
} from './giftcards.types';

export class GiftCardService {
    constructor(private config: ReloadlyConfig, private http: HttpClient) { }

    // Authentication
    async createAccessToken(): Promise<OAuthToken> {
        return this.http.request<OAuthToken>({
            path: '/oauth/token',
            method: 'POST',
            useAuthBaseUrl: true,
        });
    }

    // Account Balance
    async getBalance(): Promise<BalanceResult> {
        return this.http.request<BalanceResult>({ path: '/balance' });
    }

    // Categories
    async getCategories(): Promise<Category[]> {
        return this.http.request<Category[]>({ path: '/categories' });
    }

    // Countries
    async getCountries(): Promise<Country[]> {
        return this.http.request<Country[]>({ path: '/countries' });
    }

    async getCountryByISO(isoCode: string): Promise<Country> {
        return this.http.request<Country>({ path: `/countries/${isoCode}` });
    }

    // Products
    async getProducts(): Promise<Product[]> {
        return this.http.request<Product[]>({ path: '/products' });
    }

    async getProductById(productId: number): Promise<Product> {
        return this.http.request<Product>({ path: `/products/${productId}` });
    }

    async getProductByISO(isoCode: string): Promise<Product[]> {
        return this.http.request<Product[]>({ path: `/products?isoCode=${isoCode}` });
    }

    // Redeem Instructions
    async getRedeemInstructions(): Promise<RedeemInstructions[]> {
        return this.http.request<RedeemInstructions[]>({ path: '/redeem-instructions' });
    }

    async getRedeemInstructionsByProductId(productId: number): Promise<RedeemInstructions> {
        return this.http.request<RedeemInstructions>({ path: `/redeem-instructions/${productId}` });
    }

    // FX Rates
    async fetchFXRate(from: string, to: string): Promise<FXRate> {
        return this.http.request<FXRate>({ path: `/fx-rates?from=${from}&to=${to}` });
    }

    // Discounts
    async getDiscounts(): Promise<Discount[]> {
        return this.http.request<Discount[]>({ path: '/discounts' });
    }

    async getDiscountByProductId(productId: number): Promise<Discount> {
        return this.http.request<Discount>({ path: `/discounts/${productId}` });
    }

    // Transactions
    async getTransactions(): Promise<Transaction[]> {
        return this.http.request<Transaction[]>({ path: '/transactions' });
    }

    async getTransactionById(id: string): Promise<Transaction> {
        return this.http.request<Transaction>({ path: `/transactions/${id}` });
    }

    // Orders
    async orderGiftCard(options: OrderGiftCardOptions): Promise<OrderGiftCardResult> {
        return this.http.request<OrderGiftCardResult, unknown, OrderGiftCardOptions>({
            path: '/orders',
            method: 'POST',
            body: options,
        });
    }

    async getRedeemCode(orderId: string): Promise<OrderGiftCardResult> {
        return this.http.request<OrderGiftCardResult>({ path: `/orders/${orderId}/redeem-code` });
    }
}
