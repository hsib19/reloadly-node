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
    OperatorOptions,
    AutoDetectOperatorPath,
    AutoDetectOperatorQuery,
    GetOperatorByIsoCodeParams,
    FXRateRequest,
    GetPromotionsParams,
    GetTransactionsParams,
} from './airtime.types.js';
import { BalanceResult } from '../../types/commonTypes.js';

export class AirtimeService {
    constructor(private config: ReloadlyConfig, private http: HttpClient) { }

    // Account Balance
    async getBalance(): Promise<BalanceResult> {
        return this.http.request<BalanceResult>({ path: '/accounts/balance' });
    }

    // Countries
    async getCountries(): Promise<Countries> {
        return this.http.request<Countries>({ path: '/countries' });
    }

    async getCountryByISO(isoCode: string): Promise<Country> {
        return this.http.request<Country>({ path: `/countries/${isoCode}` });
    }

    // Operators
    async getOperators(query?: OperatorOptions): Promise<GetOperatorResponse> {
        return this.http.request<GetOperatorResponse, OperatorOptions>({
            path: '/operators',
            query,
        });
    }

    async getOperatorById(operatorId: number): Promise<OperatorByIdResponse> {
        return this.http.request<OperatorByIdResponse>({ path: `/operators/${operatorId}` });
    }

    async autoDetectOperator(params: {
        path: AutoDetectOperatorPath,
        query?: AutoDetectOperatorQuery
    }): Promise<AutoDetectOperatorResponse> {
        return this.http.request<AutoDetectOperatorResponse>({
            path: `/operators/auto-detect/phone/${params.path.phone}/countries/${params.path.countryIsoCode}`,
            query: params.query
        });
    }

    async getOperatorByISOCode(params: {
        path: {
            countryCode: string;
        },
        query?: GetOperatorByIsoCodeParams
    }): Promise<GetOperatorByISOId> {
        return this.http.request<GetOperatorByISOId>({
            path: `/operators/countries/${params.path.countryCode}`,
            query: params.query
        });
    }

    // FX Rates
    async fetchFXRate(body: FXRateRequest): Promise<FXRate> {
        return this.http.request<FXRate>({ path: `/operators/fx-rate`, method: 'POST', body });
    }

    // Commissions
    async getCommissions(query?: { page?: number, size?: number }): Promise<GetCommissionsResponse[]> {
        return this.http.request<GetCommissionsResponse[]>({ path: '/operators/commissions', query });
    }

    async getCommissionByOperatorId(operatorId: number): Promise<CommissionByOperatorIdResponse> {
        return this.http.request<CommissionByOperatorIdResponse>({ path: `/operators/${operatorId}/commissions` });
    }

    // Promotions
    async getPromotions(query?: GetPromotionsParams): Promise<GetPromotionsResponse> {
        return this.http.request<GetPromotionsResponse>({ path: `/promotions`, query });
    }

    async getPromotionById(params: {
        path: {
            promotionId: number
        },
        query?: { languageCode: string }
    }): Promise<GetPromotionByIdResponse> {
        return this.http.request<GetPromotionByIdResponse>({ path: `/promotions/${params.path.promotionId}`, query: params.query });
    }

    async getPromotionsByISO(params: {
        path: {
            countryCode: string;
        },
        query?: { languageCode: string }
    }): Promise<GetPromotionsByIsoCodeResponse> {
        return this.http.request<GetPromotionsByIsoCodeResponse>({ path: `/promotions/country-codes/${params.path.countryCode}`, query: params.query });
    }

    async getPromotionsByOperatorId(params: {
        path: {
            operatorId: number
        },
        query?: { languageCode: string }
    }): Promise<GetPromotionsByOperatorIdResponse> {
        return this.http.request<GetPromotionsByOperatorIdResponse>({ path: `/promotions/operators/${params.path.operatorId}`, query: params.query });
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
    async getTransactions(query?: GetTransactionsParams): Promise<GetTransactionsResponse> {
        return this.http.request<GetTransactionsResponse>({ path: '/topups/reports/transactions', query });
    }

    async getTransactionById(transactionId: string): Promise<Transaction> {
        return this.http.request<Transaction>({ path: `/topups/reports/transactions/${transactionId}` });
    }

    // MNP Lookup
    async mnpLookupGET(params: {
        path: {
            phone: number;
            countryCode: string
        },
        query?: {
            suggestedAmountsMap?: boolean;
            suggestedAmounts?: boolean;
        }
    }): Promise<MnpLookupResponse> {
        return this.http.request<MnpLookupResponse>({ path: `/operators/mnp-lookup/phone/${params.path.phone}/countries/${params.path.countryCode}`, query: params.query });
    }

    async mnpLookupPOST(body: MnpLookupRequest): Promise<MnpLookupResponse> {
        return this.http.request<MnpLookupResponse>({
            path: '/mnp-lookup/operators',
            method: 'POST',
            body
        });
    }
}
