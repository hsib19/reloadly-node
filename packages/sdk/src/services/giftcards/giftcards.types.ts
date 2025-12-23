// Categories
export interface Category {
    id: number;
    name: string;
}

// Countries
export interface Country {
    isoName: string;
    name: string;
    continent: string;
    currencyCode: string;
    currencyName: string;
    currencySymbol: string;
    flag: string;
    callingCodes: string[];
}

export type Countries = Country[];

// Products
export interface Brand {
    brandId: number;
    brandName: string;
}

export interface ProductRedeemInstruction {
    concise: string;
    verbose: string;
}

export interface AdditionalRequirements {
    userIdRequired: boolean;
}

export interface Product {
    productId: number;
    productName: string;
    global: boolean;
    supportsPreOrder: boolean;
    status: string;
    senderFee: number;
    senderFeePercentage: number;
    discountPercentage: number;
    denominationType: string;
    recipientCurrencyCode: string;
    recipientCurrencyToSenderCurrencyExchangeRate: number;
    minRecipientDenomination: number | null;
    maxrecipientDenomination: number | null;
    senderCurrencyCode: string;
    minSenderDenomination: number | null;
    maxSenderDenomination: number | null;
    fixedRecipientDenominations: number[];
    fixedSenderDenominations: number[];
    fixedRecipientToSenderDenominationsMap: Record<string, number>[];
    logoUrls: string[];
    brand: Brand;
    category: Category;
    country: Country;
    redeemInstruction: ProductRedeemInstruction;
    additionalRequirements: AdditionalRequirements;
}

export interface GetProductsResponse {
    content: Product[];
}

export interface BrandRedeemInstruction {
    brandId: number;
    brandName: string;
    concise: string;
    verbose: string;
}

export interface GetRedeemInstructionsResponse {
    content: BrandRedeemInstruction[];
}

// FX Rates
export interface FXRate {
    senderCurrency: string;
    senderAmount: number;
    recipientCurrency: string;
    recipientAmount: number;
}

// Discounts
export interface Discount {
    discountPercentage: number;
    product: {
        productId: number;
        productName: string;
        countryCode: string;
        global: boolean;
    };
}

// Transactions
export interface ProductTransaction {
    productId: number;
    productName: string;
    countryCode: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    currencyCode: string;
    brand: Brand;
}

export interface BalanceInfo {
    oldBalance: number;
    newBalance: number;
    cost: number;
    currencyCode: string;
    currencyName: string;
    updatedAt: string;
}

export interface GiftCardTransaction {
    transactionId: number;
    amount: number;
    discount: number;
    currencyCode: string;
    fee: number;
    customIdentifier: string;
    status: string;
    product: ProductTransaction;
    smsFee: number;
    totalFee: number;
    receipientPhone: number;
    recipientEmail: string;
    transactionCreatedTime: string;
    preOrdered: boolean;
    balanceInfo: BalanceInfo;
}

export interface GetGiftCardTransactionsResponse {
    content: GiftCardTransaction[];
}

// Orders
export interface OrderGiftCardOptions {
    productId: number;
    recipientEmail: string;
}

export interface OrderGiftCardResponse {
    transactionId: number;
    amount: number;
    discount: number;
    currencyCode: string;
    fee: number;
    recipientEmail: string;
    customIdentifier: string;
    status: string;
    product: Product;
    smsFee: number;
    totalFee: number;
    receipientPhone: number;
    transactionCreatedTime: string;
    preOrdered: boolean;
    balanceInfo: BalanceInfo;
}

export interface OrderRedeemCodeResponse {
    cardNumber: number;
    pinCode: string;
    redemptionUrl: string;
}
