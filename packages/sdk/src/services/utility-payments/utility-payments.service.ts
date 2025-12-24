import { ReloadlyConfig } from '../../client/reloadly-client.js';
import { HttpClient } from '../../client/http-client.js';
import type {
    GetBillersQueryParams,
    GetBillersResponse,
    GetTransactionsQueryParams,
    GetTransactionsResponse,
    PayBillRequest,
    PayBillResponse,
    Transaction,
} from './utility-payments.types.js';
import { BalanceResult } from '../../types/commonTypes.js';

export class UtilityPaymentsService {
    constructor(private config: ReloadlyConfig, private http: HttpClient) { }

    // Account Balance
    async getBalance(): Promise<BalanceResult> {
        return this.http.request<BalanceResult>({ path: '/accounts/balance' });
    }

    // Utility Billers
    async getBillers(query?: GetBillersQueryParams): Promise<GetBillersResponse> {
        return this.http.request<GetBillersResponse>({ path: '/billers', query });
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
    async getTransactions(query?: GetTransactionsQueryParams): Promise<GetTransactionsResponse> {
        return this.http.request<GetTransactionsResponse>({ path: '/transactions', query });
    }

    async getTransactionById(id: number): Promise<Transaction> {
        return this.http.request<Transaction>({ path: `/transactions/${id}` });
    }
}
