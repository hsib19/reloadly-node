import { ReloadlyConfig } from '../../client/reloadly-client';

export class AirtimeService {
    constructor(private config: ReloadlyConfig) { }

    async getOperators(countryCode: string) {
        // placeholder
        return [countryCode];
    }

    async topUp(options: { operatorId: number; amount: number; phoneNumber: string }) {
        // placeholder
        return { status: 'pending', optiosn: options.amount };
    }
}
