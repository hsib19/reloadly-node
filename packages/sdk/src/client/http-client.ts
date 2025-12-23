import { ReloadlyConfig } from "../client/reloadly-client.js";
import { TokenManager } from "../auth/token-manager.js";
import { ReloadlyAPIError } from "../errors/reloadly-error.js";

export interface HttpRequestOptions<TQuery = unknown, TBody = unknown> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    query?: TQuery;
    body?: TBody;
    headers?: Record<string, string>;
    useAuthBaseUrl?: boolean;
}

export class HttpClient {
    constructor(
        private readonly config: ReloadlyConfig,
        private readonly tokenManager: TokenManager,
        private readonly baseUrl: string,
        private readonly accept: string
    ) { }

    async request<T, Q = unknown, B = unknown>(options: {
        path: string;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        query?: Q;
        body?: B;
    }): Promise<T> {
        const token = await this.tokenManager.getToken();

        const url = new URL(options.path, this.baseUrl);

        if (options.query) {
            Object.entries(options.query).forEach(([k, v]) =>
                url.searchParams.append(k, String(v))
            );
        }

        const res = await fetch(url.toString(), {
            method: options.method ?? 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: this.accept,
                'Content-Type': 'application/json',
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok) {
            throw new ReloadlyAPIError(res.status, data);
        }

        return data as T;
    }
}

