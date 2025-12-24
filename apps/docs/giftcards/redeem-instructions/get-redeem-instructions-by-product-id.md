# Get Gift Card Redeem Instructions by Product ID

The Reloadly Node SDK allows you to fetch redeem instructions for a specific gift card product using its product ID.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter   | Type    | Required | Description                 | Example |
| ----------- | ------- | -------- | --------------------------- | ------- |
| `productId` | Integer | Yes      | The gift card product's ID. | 4       |

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
    const redeemInstructions = await reloadlySDK.giftcards.getRedeemInstructionsByProductId(4);

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
{
  "productId": 3245,
  "productName": "Free Fire 210 + 21 Diamond IN",
  "concise": "Redeem the Free Fire code online at https://shop.garena.sg/app",
  "verbose": "Only Player ID & Nickname is needed for Garena Free Fire Diamonds top-up. You may stay logged in throughout the transaction, once the top-up is completed, you will receive the Diamonds in your Garena Free Fire account. &#13;Please enter your Player ID & Nickname correctly to avoid delay on Diamonds top-up. &#13;Follow these simple steps to get your diamonds by redeeming the Free Fire code online: https://shop.garena.sg/app &#13;-Select Free Fire &#13;-Log into your account either through linked social media or by entering your Player ID. &#13;-Select Garena Voucher &#13;-Enter the code you received from us. &#13;-The diamonds will then be visible in your Free Fire account."
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `productId` is **required** to identify the specific gift card product.
- The response includes product ID, product name, and a list of redeem instructions.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for displaying clear redemption steps to end-users after purchasing a gift card.
