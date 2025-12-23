import { ReloadlyAPIError, ReloadlyNetworkError } from '../errors/reloadly-error.js';
import { getAuthBaseUrl, getAudience } from '../utils/env.js';
import { OAuthToken, TokenRequestConfig } from '../types/commonTypes.js';

export class TokenManager {
    private token?: OAuthToken;

    constructor(private readonly config: TokenRequestConfig) { }

    private isTokenValid(): boolean {
        if (!this.token) return false;
        const now = Math.floor(Date.now() / 1000);
        return now < this.token.obtained_at + this.token.expires_in - 30;
    }

    async getToken(): Promise<string> {
        if (this.isTokenValid()) {
            return this.token!.access_token;
        }

        const token = await this.fetchToken();
        this.token = {
            ...token,
            obtained_at: Math.floor(Date.now() / 1000),
        };

        return this.token.access_token;
    }

    private async fetchToken(): Promise<OAuthToken> {
        const url = `${getAuthBaseUrl(this.config.environment ?? 'sandbox')}/oauth/token`;

        const body = {
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: 'client_credentials',
            audience: getAudience(this.config.environment ?? 'sandbox'),
        };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = (await res.json()) as OAuthToken;

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
