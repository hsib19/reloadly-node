// Utility Billers
export interface FxRate {
    rate?: number;
    currencyCode?: string;
}

export interface Biller {
    id: number;
    name: string;
    countryIsoCode: string;
    type: string;
    serviceType: string;
    localAmountSupported: boolean;
    localTransactionCurrencyCode: string;
    minLocalTransactionAmount: number;
    maxLocalTransactionAmount: number;
    localTransactionFee: number;
    localTransactionFeeCurrencyCode: string;
    localTransactionFeePercentage: number;
    localDiscountPercentage: number;
    internatonalAmountSupported: boolean;
    internationalTransactionCurrencyCode: string;
    minInternationalTransactionAmount: number;
    maxInternationalTransactionAmount: number;
    internationalTransactionFee: number;
    internationalTransactionFeePercentage: number;
    internationalTransactionFeeCurrencyCode: string;
    internationalDiscountPercentage: number;
    requiresInvoice: boolean;
    fx: FxRate[];
}

export interface GetBillersResponse {
    content: Biller[];
}


// Pay Bill
export interface PayBillRequest {
    additionalInfo?: Record<string, unknown>;
    amount: number;
    amountId?: number;
    billerId: number;
    referenceId?: string;
    AccountNumber: string;
    useLocalAmount?: boolean;
}

export interface PayBillResponse {
    id: number;
    status: string;
    referenceId: string;
    code: string;
    message: string;
    submittedAt: string;
    finalStatusAvailabilityAt: string;
}

// Transactions
export interface BalanceInfo {
    oldBalance: number;
    newBalance: number;
    cost: number;
    currencyCode: string;
    currencyName: string;
    updatedAt: string;
}

export interface SubscriberDetails {
    invoiceId: string | null;
    accountNumber: string;
}

export interface PinDetails {
    token: string;
    info1?: string | null;
    info2?: string | null;
    info3?: string | null;
}

export interface BillDetails {
    type: string;
    billerId: number;
    billerName: string;
    billerCountryCode: string;
    billerReferenceId: string;
    serviceType: string;
    completedAt: string;
    subscriberDetails: SubscriberDetails;
    pinDetails?: PinDetails;
}

export interface Transaction {
    id: number;
    status: string;
    referenceId: string;
    amount: number;
    amountCurrencyCode: string;
    deliveryAmount: number;
    deliveryAmountCurrencyCode: string;
    fee: number;
    feeCurrencyCode: string;
    discount: number;
    discountCurrencyCode: string;
    submittedAt: string;
    balanceInfo: BalanceInfo;
    billDetails: BillDetails;
}

export interface TransactionResult {
    code: string;
    message: string;
    transaction: Transaction;
}

export type GetTransactionsResponse = TransactionResult[];
