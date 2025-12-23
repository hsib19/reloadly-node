import { AirtimeService } from '@services/airtime/airtime.service';

export interface ReloadlyConfig {
    clientId: string;
    clientSecret: string;
    environment?: 'sandbox' | 'production';
}

export class Reloadly {
    public airtime: AirtimeService;

    private config: ReloadlyConfig;

    constructor(config: ReloadlyConfig) {
        this.config = {
            environment: 'sandbox',
            ...config,
        };

        // init services
        this.airtime = new AirtimeService(this.config);
    }
}
