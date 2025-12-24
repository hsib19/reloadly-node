# Get Gift Card Discounts

The Reloadly Node SDK allows you to fetch gift card products that currently offer discounts.

Authentication and token refresh are handled automatically by the SDK.

## Query Parameters

| Parameter | Type    | Description                                                              | Example |
| --------- | ------- | ------------------------------------------------------------------------ | ------- |
| `size`    | Integer | Indicates the number of gift card products offering discounts per page.  | 50      |
| `page`    | Integer | Indicates the page of the list of gift card products offering discounts. | 2       |

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
    const discounts = await reloadlySDK.giftcards.getDiscounts({
      size: 50,
      page: 2,
    });

    console.log('Gift card discounts:', discounts);
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
    "product": {
      "productId": 28,
      "productName": "Apple Music 12 month Canada",
      "countryCode": "CA",
      "global": false
    },
    "discountPercentage": 2
  },
  {},
  {}
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters `size` and `page` are optional and control pagination of results.
- The response includes product details such as ID, name, country, discount percentage, and currency.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving discounted gift card products to highlight promotions or offer savings to customers.
