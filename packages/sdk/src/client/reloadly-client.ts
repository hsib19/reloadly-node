import { TokenManager } from '@auth/token-manager';
import { HttpClient } from '@client/http-client';
import { ReloadlyEnvironment } from '@constants/environments';
import { AirtimeService } from '@services/airtime/airtime.service';
import { GiftCardService } from '@services/giftcards/giftcards.service';
import { UtilityPaymentsService } from '@services/utility-payments/utility-payments.service';
import { getGiftCardApiBaseUrl, getUtilityApiBaseUrl } from '@utils/env';

export interface ReloadlyConfig {
    clientId: string;
    clientSecret: string;
    environment?: ReloadlyEnvironment;
}

export class Reloadly {
    public airtime: AirtimeService;
    public giftcards: GiftCardService;
    public utilityPayments: UtilityPaymentsService;
    private tokenManager: TokenManager;

    constructor(config: ReloadlyConfig) {

        this.tokenManager = new TokenManager({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            environment: config.environment ?? 'sandbox'
        });

        const airtimeClient = new HttpClient(config, this.tokenManager);
        const giftCardClient = new HttpClient(config, this.tokenManager, getGiftCardApiBaseUrl(config.environment ?? 'sandbox'));
        const utilityClient = new HttpClient(config, this.tokenManager, getUtilityApiBaseUrl(config.environment ?? 'sandbox'));

        // init services
        this.airtime = new AirtimeService(config, airtimeClient);
        this.giftcards = new GiftCardService(config, giftCardClient);
        this.utilityPayments = new UtilityPaymentsService(config, utilityClient);
    }
}
