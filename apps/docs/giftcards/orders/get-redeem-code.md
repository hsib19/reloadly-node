# Get Gift Card Redeem Code

The Reloadly Node SDK allows you to fetch the redeem code for a specific gift card order using its transaction ID.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter       | Type    | Required | Description                                                                                     | Example |
| --------------- | ------- | -------- | ----------------------------------------------------------------------------------------------- | ------- |
| `transactionId` | Integer | Yes      | Indicates the transaction identification number of the gift card's redeem code to be retrieved. | 2       |

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
    const redeemCode = await reloadlySDK.giftcards.getRedeemCode(2);

    console.log('Gift card redeem code:', redeemCode);
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
{
  "cardNumber": 6120200345149064,
  "pinCode": "EFSDCEAFSD",
  "redemptionUrl": "https://dashboard-stage.swype.cards/activate/verify?redemption-code=XXXXXXXXXXXXXXX"
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `transactionId` is **required** to identify the specific gift card order.
- The response includes transaction ID, product details, redeem code, currency, amount, and status.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving the redeem code after a successful gift card purchase.
