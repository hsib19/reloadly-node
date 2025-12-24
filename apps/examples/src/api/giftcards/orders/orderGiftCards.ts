import { ReloadlyAPIError } from "reloadly-node";
import { reloadlySDK } from "../../../reloadly-sdk/reloadly-sdk";

async function main() {
    try {
        const orderGiftCard = await reloadlySDK.giftcards.orderGiftCard({
            productId: 10,
            quantity: 2,
            unitPrice: 5,
            customIdentifier: "obucks10",
            productAdditionalRequirements: {
                userId: "12"
            },
            senderName: "John Doe",
            recipientEmail: "anyone@email.com",
            recipientPhoneDetails: {
                countryCode: "ES",
                phoneNumber: "012345678"
            },
            preOrder: false
        });
        console.log(orderGiftCard)
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
