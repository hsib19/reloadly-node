import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const makeTopUp = await reloadlySDK.airtime.asyncTopUp({
            operatorId: "535",
            amount: "5.00",
            useLocalAmount: true,
            customIdentifier: "This is example identifier 131",
            recipientEmail: "peter@nauta.com.cu",
            recipientPhone: {
                countryCode: "GB",
                number: "447951731337"
            },
            senderPhone: {
                countryCode: "CA",
                number: "11231231231"
            }
        });
        console.log(makeTopUp)
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
