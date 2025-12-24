# Get Gift Card Discount by Product ID

The Reloadly Node SDK allows you to fetch discount information for a specific gift card product using its product ID.

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
    const discount = await reloadlySDK.giftcards.getDiscountByProductId('5');

    console.log('Gift card discount details:', discount);
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
  "product": {
    "productId": 28,
    "productName": "Apple Music 12 month Canada",
    "countryCode": "CA",
    "global": false
  },
  "discountPercentage": 2
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `productId` is **required** to identify the specific gift card product.
- The response includes product ID, product name, country, discount percentage, and currency.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving discount details of a single gift card product to highlight promotions or offer savings to customers.
