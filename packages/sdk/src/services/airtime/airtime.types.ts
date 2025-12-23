// Authenctication
export interface RequestCreateAccessTokenAirtime {
    grant_type: "client_credentials" | string;
    audience: string;
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

// Operators
export interface OperatorOptions {
    includeBundles?: boolean;
    includeData?: boolean;
    suggestedAmountsMap?: boolean;
    size?: number;
    page?: number;
    includeCombo?: boolean;
    comboOnly?: boolean;
    bundlesOnly?: boolean;
    dataOnly?: boolean;
    pinOnly?: boolean;
}

export interface Fx {
    rate: number;
    currencyCode: string;
}

export interface Fees {
    international: number;
    internationalPercentage: number;
    local: number;
    localPercentage: number;
}

export interface Operator {
    id: number;
    operatorId: number;
    name: string;
    bundle: boolean;
    data: boolean;
    comboProduct: boolean;
    pin: boolean;
    supportsLocalAmounts: boolean;
    denominationType: string;
    senderCurrencyCode: string;
    senderCurrencySymbol: string;
    destinationCurrencyCode: string;
    destinationCurrencySymbol: string;
    commission: number;
    internationalDiscount: number;
    localDiscount: number;
    mostPopularAmount: number | null;
    minAmount: number;
    maxAmount: number;
    localMinAmount: number | null;
    localMaxAmount: number | null;
    country: Country;
    fx: Fx;
    logoUrls: string[];
    fixedAmounts: number[];
    fixedAmountsDescriptions: string[];
    localFixedAmounts: number[];
    localFixedAmountsDescriptions: string[];
    suggestedAmounts: number[];
    suggestedAmountsMap: Record<string, number>;
    promotions: unknown[];
    fees: Fees;
}

export interface GetOperatorResponse {
    content: Operator[];
}

export interface OperatorByIdResponse {
    id: number;
    operatorId: number;
    name: string;
    bundle: boolean;
    data: boolean;
    comboProduct: boolean;
    pin: boolean;
    supportsLocalAmounts: boolean;
    denominationType: string;
    senderCurrencyCode: string;
    senderCurrencySymbol: string;
    destinationCurrencyCode: string;
    destinationCurrencySymbol: string;
    commission: number;
    internationalDiscount: number;
    localDiscount: number;
    mostPopularAmount: number | null;
    minAmount: number;
    maxAmount: number;
    localMinAmount: number | null;
    localMaxAmount: number | null;
    country: Country;
    fx: Fx;
    logoUrls: string[];
    fixedAmounts: number[];
    fixedAmountsDescriptions: string[];
    localFixedAmounts: number[];
    localFixedAmountsDescriptions: string[];
    suggestedAmounts: number[];
    suggestedAmountsMap: Record<string, number>;
    promotions: unknown[]; // bisa diganti sesuai struktur sebenarnya
    fees: Fees;
}

export type AutoDetectOperatorResponse = OperatorByIdResponse;
export type GetOperatorByISOId = OperatorByIdResponse;
export interface AutoDetectOperatorPath {
    phone: number;
    countryIsoCode: string;
}

export interface AutoDetectOperatorQuery {
    suggestedAmountsMap?: boolean;
    suggestedAmounts?: boolean;
}

export interface GetOperatorByIsoCodeParams {
    suggestedAmountsMap?: boolean;
    suggestedAmounts?: boolean;
    includePin?: boolean;
    includeData?: boolean;
    includeBundles?: boolean;
    includeCombo?: boolean;
    comboOnly?: boolean;
    bundlesOnly?: boolean;
    dataOnly?: boolean;
    pinOnly?: boolean;
}

// FX Rates
export interface FXRate {
    id: number;
    name: string;
    fxRate: number;
    currencyCode: string;
}

export interface FXRateRequest {
    amount: number;
    operatorId: number;
}

// Commissions
export interface OperatorInfo {
    operatorId: number;
    name: string;
    countryCode: string;
    status: boolean;
    bundle: boolean;
}

export interface Commission {
    operator: OperatorInfo;
    percentage: number;
    internationalPercentage: number;
    localPercentage: number;
    updatedAt: string;
}

export interface GetCommissionsResponse {
    content: Commission[];
}

export interface CommissionByOperatorIdResponse {
    operator: OperatorInfo;
    percentage: number;
    internationalPercentage: number;
    localPercentage: number;
    updatedAt: string;
}

// Promotions
export interface Promotion {
    promotionId: number;
    operatorId: number;
    title: string;
    title2: string;
    description: string;
    startDate: string;
    endDate: string;
    denominations: string;
    localDenominations: string | null;
}

export interface GetPromotionsResponse {
    content: Promotion[];
}

export interface GetPromotionByIdResponse { content: Promotion; }
export interface GetPromotionsByIsoCodeResponse { content: Promotion[]; }
export interface GetPromotionsByOperatorIdResponse { content: Promotion[]; }
export interface GetPromotionsParams {
    size?: number;
    page?: number;
    languageCode?: string;
}

// Top-ups
export interface Phone {
    countryCode: string;
    number: string;
}

export interface MakeTopUpRequest {
    amount: string;
    customIdentifier?: string;
    operatorId: string;
    recipientEmail?: string;
    recipientPhone: {
        countryCode: string;
        number: string;
    };
    senderPhone?: {
        countryCode: string;
        number: string;
    };
    useLocalAmount?: boolean;
}


export interface PinDetail {
    serial: number;
    info1: string;
    info2: string;
    info3: string;
    value: string | null;
    code: number;
    ivr: string;
    validity: string;
}

export interface MakeTopUpResponse {
    transactionId: number;
    status: string;
    operatorTransactionId: string;
    customIdentifier: string;
    recipientPhone: number;
    recipientEmail: string | null;
    senderPhone: number;
    countryCode: string;
    operatorId: number;
    operatorName: string;
    discount: number;
    discountCurrencyCode: string;
    requestedAmount: number;
    requestedAmountCurrencyCode: string;
    deliveredAmount: number;
    deliveredAmountCurrencyCode: string;
    transactionDate: string;
    fee: number;
    pinDetail: PinDetail;
    balanceInfo: BalanceInfo;
}


export interface AsyncTopUpResult {
    requestId: string;
}

export interface PinDetail {
    serial: number;
    info1: string;
    info2: string;
    info3: string;
    value: string | null;
    code: number;
    ivr: string;
    validity: string;
}

export interface BalanceInfo {
    cost: number;
    currencyCode: string;
    currencyName: string;
    newBalance: number;
    oldBalance: number;
    updatedAt: string;
}

export interface GetTopUpStatusResponse {
    code: string | null;
    message: string | null;
    status: string;
    transaction: Transaction;
}

// Transactions
export interface Transaction {
    transactionId: number;
    status: string;
    operatorTransactionId: string | null;
    customIdentifier: string;
    recipientPhone: string;
    recipientEmail: string | null;
    senderPhone: string;
    countryCode: string;
    operatorId: number;
    operatorName: string;
    discount: number;
    discountCurrencyCode: string;
    requestedAmount: number;
    requestedAmountCurrencyCode: string;
    deliveredAmount: number;
    deliveredAmountCurrencyCode: string;
    transactionDate: string;
    pinDetail: PinDetail;
    balanceInfo: BalanceInfo;
}

export interface PinDetail {
    serial: number;
    info1: string;
    info2: string;
    info3: string;
    value: string | null;
    code: number;
    ivr: string;
    validity: string;
}

export interface GetTransactionsParams {
    size?: number;
    page?: number;
    countryCode?: string;
    operatorId?: string;
    operatorName?: string;
    customIdentifier?: string;
    startDate?: string;
    endDate?: string;
}

export interface GetTransactionsResponse {
    content: Transaction[];
}

// MNP Lookup
export interface MnpLookupRequest {
    number: number;
    countryCode: string;
}

export interface MnpLookupResponse {
    id: number;
    operatorId: number;
    name: string;
    bundle: boolean;
    data: boolean;
    comboProduct: boolean;
    pin: boolean;
    supportsLocalAmounts: boolean;
    denominationType: string;
    senderCurrencyCode: string;
    senderCurrencySymbol: string;
    destinationCurrencyCode: string;
    destinationCurrencySymbol: string;
    commission: number;
    internationalDiscount: number;
    localDiscount: number;
    mostPopularAmount: number | null;
    minAmount: number;
    maxAmount: number;
    localMinAmount: number | null;
    localMaxAmount: number | null;
    country: Country;
    fx: Fx;
    logoUrls: string[];
    fixedAmounts: number[];
    fixedAmountsDescriptions: string[];
    localFixedAmounts: number[];
    localFixedAmountsDescriptions: string[];
    suggestedAmounts: number[];
    suggestedAmountsMap: Record<string, number>;
    promotions: unknown[];
}
