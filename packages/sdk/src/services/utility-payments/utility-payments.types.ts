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

export type UtilityType =
    | 'ELECTRICITY_BILL_PAYMENT'
    | 'WATER_BILL_PAYMENT'
    | 'TV_BILL_PAYMENT'
    | 'INTERNET_BILL_PAYMENT'

export type ServiceType = 'PREPAID' | 'POSTPAID'

export interface GetBillersQueryParams {
    id?: number
    name?: string
    type?: UtilityType
    serviceType?: ServiceType
    countryISOCode?: string
    page?: number
    size?: number
}

// Pay Bill
export interface AdditionalInfo {
    [key: string]: string | number | boolean | null
}

export interface PayBillRequest {
    additionalInfo?: AdditionalInfo
    amount: number
    amountId?: number | null
    billerId: number
    referenceId?: string
    subscriberAccountNumber: string
    useLocalAmount?: boolean
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
export type TransactionStatus =
    | 'PROCESSING'
    | 'SUCCESSFUL'
    | 'FAILED'
    | 'REFUNDED'

export type BillerType =
    | 'ELECTRICITY_BILL_PAYMENT'
    | 'WATER_BILL_PAYMENT'
    | 'TV_BILL_PAYMENT'
    | 'INTERNET_BILL_PAYMENT'

export interface GetTransactionsQueryParams {
    referenceId?: string
    page?: number
    size?: number
    startDate?: string
    endDate?: string
    status?: TransactionStatus
    serviceType?: ServiceType
    billerType?: BillerType
    billerCountryCode?: string
}

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
