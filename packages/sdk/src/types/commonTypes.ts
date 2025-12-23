import { ReloadlyEnvironment } from "../constants/environments.js";

// Authentication
export interface OAuthToken {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    obtained_at: number;
}

export interface TokenRequestConfig {
    clientId: string;
    clientSecret: string;
    environment?: ReloadlyEnvironment;
    audience?: string;
}

// Account Balance
export interface BalanceResult {
    balance: number;
    currencyCode: string;
    currencyName: string;
    updatedAt: string;
}
