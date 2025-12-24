import { ReloadlyConfig } from '../../client/reloadly-client.js';
import { HttpClient } from '../../client/http-client.js';
import type {
    Category,
    Product,
    FXRate,
    Discount,
    OrderGiftCardOptions,
    OrderGiftCardResponse,
    Countries,
    GetProductsResponse,
    GetRedeemInstructionsResponse,
    GetGiftCardTransactionsResponse,
    GiftCardTransaction,
    OrderRedeemCodeResponse,
    ProductRedeemInstruction,
} from './giftcards.types.js';
import { BalanceResult } from '../../types/commonTypes.js';

export class GiftCardService {
    constructor(private config: ReloadlyConfig, private http: HttpClient) { }

    // Account Balance
    async getBalance(): Promise<BalanceResult> {
        return this.http.request<BalanceResult>({ path: '/accounts/balance' });
    }

    // Categories
    async getCategories(): Promise<Category[]> {
        return this.http.request<Category[]>({ path: '/product-categories' });
    }

    // Countries
    async getCountries(): Promise<Countries> {
        return this.http.request<Countries>({ path: '/countries' });
    }

    async getCountryByISO(countrycode: string): Promise<Countries> {
        return this.http.request<Countries>({ path: `/countries/${countrycode}` });
    }

    // Products
    async getProducts(): Promise<GetProductsResponse> {
        return this.http.request<GetProductsResponse>({ path: '/products' });
    }

    async getProductById(productId: number): Promise<Product> {
        return this.http.request<Product>({ path: `/products/${productId}` });
    }

    async getProductByISO(countrycode: string): Promise<Product> {
        return this.http.request<Product>({ path: `countries/${countrycode}/products` });
    }

    // Redeem Instructions
    async getRedeemInstructions(): Promise<GetRedeemInstructionsResponse> {
        return this.http.request<GetRedeemInstructionsResponse>({ path: '/redeem-instructions' });
    }

    async getRedeemInstructionsByProductId(productId: number): Promise<ProductRedeemInstruction> {
        return this.http.request<ProductRedeemInstruction>({ path: `/products/${productId}/redeem-instructions` });
    }

    // FX Rates
    async fetchFXRate(): Promise<FXRate> {
        return this.http.request<FXRate>({ path: `/fx-rate` });
    }

    // Discounts
    async getDiscounts(): Promise<Discount[]> {
        return this.http.request<Discount[]>({ path: '/discounts' });
    }

    async getDiscountByProductId(productId: number): Promise<Discount> {
        return this.http.request<Discount>({ path: `/products/${productId}/discounts` });
    }

    // Transactions
    async getTransactions(): Promise<GetGiftCardTransactionsResponse> {
        return this.http.request<GetGiftCardTransactionsResponse>({ path: '/reports/transactions' });
    }

    async getTransactionById(transactionId: string): Promise<GiftCardTransaction> {
        return this.http.request<GiftCardTransaction>({ path: `/reports/transactions/${transactionId}` });
    }

    // Orders
    async orderGiftCard(options: OrderGiftCardOptions): Promise<OrderGiftCardResponse> {
        return this.http.request<OrderGiftCardResponse, unknown, OrderGiftCardOptions>({
            path: '/orders',
            method: 'POST',
            body: options,
        });
    }

    async getRedeemCode(transactionId: string): Promise<OrderRedeemCodeResponse> {
        return this.http.request<OrderRedeemCodeResponse>({ path: `/orders/transactions/${transactionId}/cards` });
    }
}
