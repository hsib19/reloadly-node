import { ReloadlyConfig } from "../client/reloadly-client.js";
import { TokenManager } from "../auth/token-manager.js";
import { ReloadlyAPIError, ReloadlyNetworkError } from "../errors/reloadly-error.js";
import { getAirtimeApiBaseUrl, getAuthBaseUrl } from "../utils/env.js";

export interface HttpRequestOptions<TQuery = unknown, TBody = unknown> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    query?: TQuery;
    body?: TBody;
    headers?: Record<string, string>;
    useAuthBaseUrl?: boolean;
}

export class HttpClient {
    constructor(private config: ReloadlyConfig, private tokenManager?: TokenManager, private baseUrl?: string) { }

    private getBaseUrl(useAuthBaseUrl?: boolean): string {
        if (this.baseUrl) return this.baseUrl;
        const env = this.config.environment ?? 'sandbox';
        return useAuthBaseUrl ? getAuthBaseUrl(env) : getAirtimeApiBaseUrl(env);
    }

    async request<TResponse, TQuery = unknown, TBody = unknown>(
        options: HttpRequestOptions<TQuery, TBody>,
    ): Promise<TResponse> {
        const url = new URL(this.getBaseUrl() + options.path);

        if (options.query) {
            Object.entries(options.query).forEach(([key, value]) => {
                if (value !== undefined) url.searchParams.append(key, String(value));
            });
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers ?? {}),
        };

        // attach Bearer token if TokenManager provided
        if (this.tokenManager) {
            headers['Authorization'] = `Bearer ${await this.tokenManager.getToken()}`;
        }

        try {
            const res = await fetch(url.toString(), {
                method: options.method ?? 'GET',
                headers,
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            const data: TResponse = await res.json().catch(() => ({} as TResponse));

            if (!res.ok) throw new ReloadlyAPIError(res.status, data);

            return data;
        } catch (err) {
            if (err instanceof ReloadlyAPIError) throw err;
            throw new ReloadlyNetworkError(err);
        }
    }
}
