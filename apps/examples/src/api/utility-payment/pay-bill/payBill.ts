import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const payBill = await reloadlySDK.utilityPayments.payBill({
            "subscriberAccountNumber": "04223568280",
            "amount": 1000,
            "amountId": null,
            "billerId": 5,
            "useLocalAmount": false,
            "referenceId": "april-electricity-bill",
            "additionalInfo": {
                "invoiceId": null
            }
        }
        );
        console.log(payBill)
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
