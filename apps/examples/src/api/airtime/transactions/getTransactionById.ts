import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const getTransactionById = await reloadlySDK.airtime.getTransactionById("163165");
        console.log(getTransactionById)
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
