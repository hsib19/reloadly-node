import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const getAutoDetectOperator = await reloadlySDK.airtime.autoDetectOperator({
            path: {
                countryIsoCode: 'ID',
                phone: 6281387999999
            }
        });
        console.log(getAutoDetectOperator)
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
