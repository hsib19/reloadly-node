import { HttpClient } from '@client/http-client';
import { AirtimeService } from '@services/airtime/airtime.service';

export interface ReloadlyConfig {
    clientId: string;
    clientSecret: string;
    environment?: 'sandbox' | 'production';
}

export class Reloadly {
    private httpClient: HttpClient;
    public airtime: AirtimeService;

    private config: ReloadlyConfig;

    constructor(config: ReloadlyConfig) {

        this.config = {
            environment: 'sandbox',
            ...config,
        };

        this.httpClient = new HttpClient(config);

        // init services
        this.airtime = new AirtimeService(this.config, this.httpClient);
    }
}
