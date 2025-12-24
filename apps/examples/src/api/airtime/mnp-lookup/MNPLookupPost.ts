import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const mnpLookupPOST = await reloadlySDK.airtime.mnpLookupPOST({
            number: 813772322131,
            countryCode: "ID"
        });
        console.log(mnpLookupPOST)
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
