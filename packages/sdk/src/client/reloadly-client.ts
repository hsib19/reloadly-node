import { TokenManager } from '../auth/token-manager.js';
import { HttpClient } from '../client/http-client.js';
import { ACCEPT_HEADERS } from '../constants/accept-headers.js';
import { ReloadlyEnvironment } from '../constants/environments.js';
import { AirtimeService } from '../services/airtime/airtime.service.js';
import { GiftCardService } from '../services/giftcards/giftcards.service.js';
import { UtilityPaymentsService } from '../services/utility-payments/utility-payments.service.js';
import { getAirtimeApiBaseUrl, getAudience, getGiftCardApiBaseUrl, getUtilityApiBaseUrl } from '../utils/env.js';

export interface ReloadlyConfig {
    clientId: string;
    clientSecret: string;
    environment?: ReloadlyEnvironment;
}

export class Reloadly {
    public airtime: AirtimeService;
    public giftcards: GiftCardService;
    public utilityPayments: UtilityPaymentsService;

    constructor(config: ReloadlyConfig) {

        const airtimeTokenManager = new TokenManager({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            environment: config.environment ?? 'sandbox',
            audience: getAudience(config.environment ?? 'sandbox', 'airtime')
        });

        const giftcardsTokenManager = new TokenManager({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            environment: config.environment ?? 'sandbox',
            audience: getAudience(config.environment ?? 'sandbox', 'giftCards')
        });

        const utilitiesTokenManager = new TokenManager({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            environment: config.environment ?? 'sandbox',
            audience: getAudience(config.environment ?? 'sandbox', 'utilities')
        });

        const env = config.environment ?? 'sandbox';

        const airtimeClient = new HttpClient(
            config,
            airtimeTokenManager,
            getAirtimeApiBaseUrl(env),
            ACCEPT_HEADERS.airtime
        );

        const giftcardClient = new HttpClient(
            config,
            giftcardsTokenManager,
            getGiftCardApiBaseUrl(env),
            ACCEPT_HEADERS.giftcards
        );

        const utilityClient = new HttpClient(
            config,
            utilitiesTokenManager,
            getUtilityApiBaseUrl(env),
            ACCEPT_HEADERS.utilities
        );

        this.airtime = new AirtimeService(config, airtimeClient);
        this.giftcards = new GiftCardService(config, giftcardClient);
        this.utilityPayments = new UtilityPaymentsService(config, utilityClient);
    }
}
