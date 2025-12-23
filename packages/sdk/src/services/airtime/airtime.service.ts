import { ReloadlyConfig } from '../../client/reloadly-client.js';
import { HttpClient } from '../../client/http-client.js';
import type {
    Country,
    FXRate,
    AsyncTopUpResult,
    Transaction,
    Countries,
    GetOperatorResponse,
    OperatorByIdResponse,
    AutoDetectOperatorResponse,
    GetOperatorByISOId,
    GetCommissionsResponse,
    CommissionByOperatorIdResponse,
    GetPromotionsResponse,
    GetPromotionByIdResponse,
    GetPromotionsByIsoCodeResponse,
    GetPromotionsByOperatorIdResponse,
    MakeTopUpResponse,
    MakeTopUpRequest,
    GetTopUpStatusResponse,
    GetTransactionsResponse,
    MnpLookupResponse,
    MnpLookupRequest,
} from './airtime.types.js';
import { OAuthToken, BalanceResult } from '../../types/commonTypes.js';

export class AirtimeService {
    constructor(private config: ReloadlyConfig, private http: HttpClient) { }

    // Authentication
    async createAccessToken(): Promise<OAuthToken> {
        return this.http.request<OAuthToken>({ path: '/auth/token', method: 'POST' });
    }

    // Account Balance
    async getBalance(): Promise<BalanceResult> {
        return this.http.request<BalanceResult>({ path: '/accounts/balance' });
    }

    // Countries
    async getCountries(): Promise<Countries[]> {
        return this.http.request<Countries[]>({ path: '/countries' });
    }

    async getCountryByISO(isoCode: string): Promise<Country> {
        return this.http.request<Country>({ path: `/countries/${isoCode}` });
    }

    // Operators
    async getOperators(countryCode: string): Promise<GetOperatorResponse[]> {
        return this.http.request<GetOperatorResponse[], { countryCode: string }>({
            path: '/operators',
            query: { countryCode },
        });
    }

    async getOperatorById(operatorId: number): Promise<OperatorByIdResponse> {
        return this.http.request<OperatorByIdResponse>({ path: `/operators/${operatorId}` });
    }

    async autoDetectOperator(phoneNumber: string, countryisocode: string): Promise<AutoDetectOperatorResponse> {
        return this.http.request<AutoDetectOperatorResponse>({ path: `/operators/auto-detect/phone/${phoneNumber}/countries/${countryisocode}` });
    }

    async getOperatorByISOId(countrycode: string): Promise<GetOperatorByISOId> {
        return this.http.request<GetOperatorByISOId>({ path: `/operators/countries/${countrycode}` });
    }

    // FX Rates
    async fetchFXRate(): Promise<FXRate> {
        return this.http.request<FXRate>({ path: `/operators/fx-rate` });
    }

    // Commissions
    async getCommissions(): Promise<GetCommissionsResponse[]> {
        return this.http.request<GetCommissionsResponse[]>({ path: '/operators/commissions' });
    }

    async getCommissionByOperatorId(operatorId: number): Promise<CommissionByOperatorIdResponse> {
        return this.http.request<CommissionByOperatorIdResponse>({ path: `/operators/${operatorId}/commissions` });
    }

    // Promotions
    async getPromotions(): Promise<GetPromotionsResponse> {
        return this.http.request<GetPromotionsResponse>({ path: `/promotions` });
    }

    async getPromotionById(promotionId: number): Promise<GetPromotionByIdResponse> {
        return this.http.request<GetPromotionByIdResponse>({ path: `/promotions/${promotionId}` });
    }

    async getPromotionsByISO(countryCode: string): Promise<GetPromotionsByIsoCodeResponse> {
        return this.http.request<GetPromotionsByIsoCodeResponse>({ path: `/promotions/country-codes/${countryCode}` });
    }

    async getPromotionsByOperatorId(operatorId: number): Promise<GetPromotionsByOperatorIdResponse> {
        return this.http.request<GetPromotionsByOperatorIdResponse>({ path: `/promotions/operators/${operatorId}` });
    }

    // Top-ups
    async topUp(options: MakeTopUpRequest): Promise<MakeTopUpResponse> {
        return this.http.request<MakeTopUpResponse, unknown, MakeTopUpRequest>({
            path: '/topups',
            method: 'POST',
            body: options,
        });
    }

    async asyncTopUp(options: MakeTopUpRequest): Promise<AsyncTopUpResult> {
        return this.http.request<AsyncTopUpResult, unknown, MakeTopUpRequest>({
            path: '/topups-async',
            method: 'POST',
            body: options,
        });
    }

    async getTopUpStatus(transactionId: string): Promise<GetTopUpStatusResponse> {
        return this.http.request<GetTopUpStatusResponse>({ path: `/topups/${transactionId}/status` });
    }

    // Transactions
    async getTransactions(): Promise<GetTransactionsResponse> {
        return this.http.request<GetTransactionsResponse>({ path: '/topups/reports/transactions' });
    }

    async getTransactionById(transactionId: string): Promise<Transaction> {
        return this.http.request<Transaction>({ path: `/topups/reports/transactions/${transactionId}` });
    }

    // MNP Lookup
    async mnpLookupGET(phone: string, countryCode: string): Promise<MnpLookupResponse> {
        return this.http.request<MnpLookupResponse>({ path: `/operators/mnp-lookup/phone/${phone}/countries/${countryCode}` });
    }

    async mnpLookupPOST(body: MnpLookupRequest): Promise<MnpLookupResponse> {
        return this.http.request<MnpLookupResponse>({
            path: '/mnp-lookup/operators',
            method: 'POST',
            body
        });
    }
}
