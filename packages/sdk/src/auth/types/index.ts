export interface OAuthToken {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    obtained_at: number;
}

export interface TokenRequestConfig {
    clientId: string;
    clientSecret: string;
    environment: 'sandbox' | 'production';
}
