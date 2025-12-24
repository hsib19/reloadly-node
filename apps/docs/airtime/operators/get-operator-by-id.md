# Get Operator by ID

The Reloadly Node SDK allows you to fetch details of a specific operator using its unique ID.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameter

| Parameter    | Type    | Required | Description                          | Example |
| ------------ | ------- | -------- | ------------------------------------ | ------- |
| `operatorId` | Integer | Yes      | The operator's identification number | 341     |

## Example with Error Handling

```ts
import { Reloadly, ReloadlyAPIError } from 'reloadly-node';

const reloadly = new Reloadly({
  clientId: process.env.RELOADLY_CLIENT_ID!,
  clientSecret: process.env.RELOADLY_CLIENT_SECRET!,
  environment: 'sandbox', // or "production"
});

async function main() {
  try {
    // Example: Fetch operator by ID (341)
    const operator = await reloadly.airtime.getOperatorById(341);
    console.log('Operator details:', operator);
  } catch (error) {
    if (error instanceof ReloadlyAPIError) {
      // Handle Reloadly API errors
      console.error('Reloadly API Error:', error.message);
      console.error('Error details:', error.data);
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
    }
  }
}
```

## Response Example

```json
{
  "id": 88,
  "operatorId": 88,
  "name": "Movistar Colombia",
  "bundle": false,
  "data": false,
  "comboProduct": false,
  "pin": false,
  "supportsLocalAmounts": false,
  "denominationType": "RANGE",
  "senderCurrencyCode": "USD",
  "senderCurrencySymbol": "$",
  "destinationCurrencyCode": "COP",
  "destinationCurrencySymbol": "$",
  "commission": 4.42,
  "internationalDiscount": 4.42,
  "localDiscount": 0,
  "mostPopularAmount": null,
  "minAmount": 5,
  "maxAmount": 5,
  "localMinAmount": null,
  "localMaxAmount": null,
  "country": {
    "isoName": "CO",
    "name": "Colombia"
  },
  "fx": {
    "rate": 2192.1867,
    "currencyCode": "COP"
  },
  "logoUrls": [
    "https://s3.amazonaws.com/rld-operator/3f4a8bcd3268-size-1.png",
    "https://s3.amazonaws.com/rld-operator/3f4a8bcd3268-size-2.png",
    "https://s3.amazonaws.com/rld-operator/3f4a8bcd3268-size-3.png"
  ],
  "fixedAmounts": [],
  "fixedAmountsDescriptions": [],
  "localFixedAmounts": [],
  "localFixedAmountsDescriptions": [],
  "suggestedAmounts": [7, 10, 15],
  "suggestedAmountsMap": {
    "7": 19482.51,
    "10": 27832.16,
    "15": 41748.23
  },
  "promotions": [],
  "fees": {
    "international": 0.943054,
    "internationalPercentage": 0,
    "local": 300,
    "localPercentage": 0
  }
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving detailed operator information (limits, FX rates, supported products) before performing top-ups or checking promotions.
- Requires a valid `operatorId` as a path parameter.
