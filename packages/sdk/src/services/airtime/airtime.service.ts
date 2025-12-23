import { ReloadlyConfig } from '@client/reloadly-client';
import { HttpClient } from '@client/http-client';
import type { Operator, TopUpOptions, TopUpResult } from './airtime.types';

export class AirtimeService {
    constructor(private config: ReloadlyConfig, private http: HttpClient) { }

    async getOperators(countryCode: string): Promise<Operator[]> {
        return this.http.request<Operator[], { countryCode: string }>({
            path: '/operators',
            query: { countryCode },
        });
    }

    async topUp(options: TopUpOptions): Promise<TopUpResult> {
        return this.http.request<TopUpResult, unknown, TopUpOptions>({
            path: '/topup',
            method: 'POST',
            body: options,
        });
    }
}
