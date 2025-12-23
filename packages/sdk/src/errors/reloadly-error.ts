export class ReloadlyAPIError extends Error {
    public status: number;
    public data: unknown;

    constructor(status: number, data: unknown) {
        super(`Reloadly API Error: ${status}`);
        this.name = 'ReloadlyAPIError';
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, ReloadlyAPIError.prototype);
    }
}

export class ReloadlyNetworkError extends Error {
    public originalError: unknown;

    constructor(originalError: unknown) {
        super('Reloadly Network Error');
        this.name = 'ReloadlyNetworkError';
        this.originalError = originalError;
        Object.setPrototypeOf(this, ReloadlyNetworkError.prototype);
    }
}
