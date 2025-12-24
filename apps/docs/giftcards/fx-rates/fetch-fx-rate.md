# Fetch FX Rates

The Reloadly Node SDK allows you to fetch the FX (foreign exchange) rate for a given operator and amount.

Authentication and token refresh are handled automatically by the SDK.

## Payload Description

| Parameter      | Type    | Required | Description                                                                    | Example |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------ | ------- |
| `currencyCode` | Integer | No       | This indicates the code of the currency for which the fx-rate will be fetched. | USD     |
| `amount`       | String  | No       | The operator's identification number.                                          | 94.99   |

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
    const fetchFXRate = await reloadlySDK.giftcards.fetchFXRate({
      currencyCode: 'USD',
      amount: '341',
    });

    console.log('FX Rate:', fetchFXRate);
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
  "id": 174,
  "name": "Natcom Haiti",
  "fxRate": 465,
  "currencyCode": "HTG"
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Payload parameters `amount` and `operatorId` are **required**.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers for Giftcards requests.
- Error handling with `ReloadlyAPIError` helps distinguish API-specific issues from unexpected runtime errors.
- Useful for calculating the FX rate before performing a top-up to ensure the correct converted amount.
- The response includes details such as the exchange rate, currency information, and operator data.
