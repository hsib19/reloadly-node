import { ReloadlyAPIError, ReloadlyNetworkError } from '@errors/reloadly-error';
import { OAuthToken, TokenRequestConfig } from './types';
import { getAuthBaseUrl } from '@utils/env';

export class TokenManager {
    private token?: OAuthToken;

    constructor(private config: TokenRequestConfig) { }

    private getBaseUrl(): string {
        return getAuthBaseUrl(this.config.environment);
    }

    private isTokenValid(): boolean {
        if (!this.token) return false;
        const now = Date.now() / 1000;
        return now < this.token.obtained_at + this.token.expires_in - 30; // 30s buffer
    }

    async getToken(): Promise<string> {
        if (this.isTokenValid()) return this.token!.access_token;

        const newToken = await this.fetchToken();
        this.token = { ...newToken, obtained_at: Date.now() / 1000 };
        return this.token.access_token;
    }

    private async fetchToken(): Promise<OAuthToken> {
        const url = `${this.getBaseUrl()}/oauth/token`;
        const body = new URLSearchParams({
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: 'client_credentials',
        });

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
            });

            const data = await res.json().catch(() => ({} as OAuthToken));

            if (!res.ok) {
                throw new ReloadlyAPIError(res.status, data);
            }

            return data as OAuthToken;
        } catch (err) {
            if (err instanceof ReloadlyAPIError) throw err;
            throw new ReloadlyNetworkError(err);
        }
    }
}
