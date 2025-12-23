// Authentication
export interface OAuthToken {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    obtained_at: number;
}

// Account Balance
export interface BalanceResult {
    currency: string;
    availableBalance: number;
}

// Categories
export interface Category {
    id: number;
    name: string;
}

// Countries
export interface Country {
    name: string;
    isoCode: string;
}

// Products
export interface Product {
    id: number;
    name: string;
    isoCode?: string;
    categoryId: number;
    price: number;
}

// Redeem Instructions
export interface RedeemInstructions {
    productId: number;
    instructions: string;
}

// FX Rates
export interface FXRate {
    fromCurrency: string;
    toCurrency: string;
    rate: number;
}

// Discounts
export interface Discount {
    productId: number;
    percentage: number;
}

// Transactions
export interface Transaction {
    id: string;
    status: 'pending' | 'success' | 'failed';
    amount: number;
    type: 'giftcard';
    createdAt: string;
}

// Orders
export interface OrderGiftCardOptions {
    productId: number;
    recipientEmail: string;
}

export interface OrderGiftCardResult {
    orderId: string;
    status: 'pending' | 'success' | 'failed';
    redeemCode?: string;
}
