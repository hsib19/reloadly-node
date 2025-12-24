import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const mnpLookupGET = await reloadlySDK.airtime.mnpLookupGET({
            path: {
                countryCode: 'NG',
                phone: 8147658721
            }
        });
        console.log(mnpLookupGET)
    } catch (error) {
        if (error instanceof ReloadlyAPIError) {
            console.error(error.message);
            console.error(error.data);
        } else {
            console.error("Unexpected error:", error);
        }
    }
}

main();
