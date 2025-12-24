# Get Gift Card Redeem Instructions

The Reloadly Node SDK allows you to fetch redeem instructions for a specific gift card product by its product ID.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter   | Type    | Required | Description                          | Example |
| ----------- | ------- | -------- | ------------------------------------ | ------- |
| `productId` | Integer | Yes      | The product's identification number. | 5       |

## Example with Error Handling

```ts
import { Reloadly, ReloadlyAPIError } from 'reloadly-node';

const reloadlySDK = new Reloadly({
  clientId: process.env.RELOADLY_CLIENT_ID!,
  clientSecret: process.env.RELOADLY_CLIENT_SECRET!,
  environment: 'sandbox', // or "production"
});

async function main() {
  try {
    const redeemInstructions = await reloadlySDK.giftcards.getRedeemInstructions(5);

    console.log('Redeem instructions:', redeemInstructions);
  } catch (error) {
    if (error instanceof ReloadlyAPIError) {
      console.error('Reloadly API Error:', error.message);
      console.error('Error details:', error.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
```

## Response Example

```json
[
  {
    "brandId": 1,
    "brandName": "1-800-PetSupplies",
    "concise": "This card is redeemable for merchandise on www.1-800-petsupplies.com",
    "verbose": "Your acceptance of this eCertificate constitutes your agreement to these terms and conditions. This card is redeemable in U.S. only for merchandise on www.1-800-petsupplies.com . Only two eCertificates are redeemable per order. eCertificates cannot be redeemed for cash, except as required by law. Void if altered or reproduced. This gift card is issued in U.S. funds by Tabcom, LLC. When Redeeming online please be sure to enter the entire gift card number including preceding zeros. The maximum number of eCertificates that can be used for phone is nine. By accepting these Terms and Conditions through your use of this Site, you certify that you reside in the United States and are 18 years of age or older. If you are under the age of 18 but at least 14 years of age you may use this Site only under the supervision of a parent or legal guardian who agrees to be bound by these Terms and Conditions."
  },
  {},
  {}
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `productId` is **required** to identify the specific gift card product.
- The response includes product ID, product name, and a list of redeem instructions.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for displaying clear redemption steps to end-users after purchasing a gift card.
