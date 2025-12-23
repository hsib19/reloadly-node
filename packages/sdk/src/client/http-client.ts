import { ReloadlyConfig } from '@client/reloadly-client';
import { ReloadlyAPIError, ReloadlyNetworkError } from '@errors/reloadly-error';

export interface HttpRequestOptions<TQuery = unknown, TBody = unknown> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    query?: TQuery;
    body?: TBody;
    headers?: Record<string, string>;
}

export class HttpClient {
    constructor(private config: ReloadlyConfig) { }

    private getBaseUrl(): string {
        return this.config.environment === 'production'
            ? 'https://topups.reloadly.com'
            : 'https://topups-sandbox.reloadly.com';
    }

    async request<TResponse, TQuery = unknown, TBody = unknown>(
        options: HttpRequestOptions<TQuery, TBody>,
    ): Promise<TResponse> {
        const url = new URL(this.getBaseUrl() + options.path);

        // attach query params
        if (options.query) {
            Object.entries(options.query).forEach(([key, value]) => {
                if (value !== undefined) url.searchParams.append(key, String(value));
            });
        }

        try {
            const res = await fetch(url.toString(), {
                method: options.method ?? 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.headers ?? {}),
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            const data: TResponse = await res.json().catch(() => ({} as TResponse));

            if (!res.ok) {
                throw new ReloadlyAPIError(res.status, data);
            }

            return data;
        } catch (err) {
            if (err instanceof ReloadlyAPIError) throw err;
            throw new ReloadlyNetworkError(err);
        }
    }
}
