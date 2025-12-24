import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const getCommissionsByOperatorId = await reloadlySDK.airtime.getCommissionByOperatorId(341);
        console.log(getCommissionsByOperatorId)
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
