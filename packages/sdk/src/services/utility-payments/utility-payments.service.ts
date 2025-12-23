import { ReloadlyConfig } from '@client/reloadly-client';
import { HttpClient } from '@client/http-client';
import type {
    GetBillersResponse,
    GetTransactionsResponse,
    PayBillRequest,
    PayBillResponse,
    Transaction,
} from './utility-payments.types';
import { BalanceResult, OAuthToken } from 'types/commonTypes';

export class UtilityPaymentsService {
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

    // Utility Billers
    async getBillers(): Promise<GetBillersResponse> {
        return this.http.request<GetBillersResponse>({ path: '/billers' });
    }

    // Pay Bill
    async payBill(options: PayBillRequest): Promise<PayBillResponse> {
        return this.http.request<PayBillResponse, unknown, PayBillRequest>({
            path: '/pay',
            method: 'POST',
            body: options,
        });
    }

    // Transactions
    async getTransactions(): Promise<GetTransactionsResponse> {
        return this.http.request<GetTransactionsResponse>({ path: '/transactions' });
    }

    async getTransactionById(id: string): Promise<Transaction> {
        return this.http.request<Transaction>({ path: `/transactions/${id}` });
    }
}
