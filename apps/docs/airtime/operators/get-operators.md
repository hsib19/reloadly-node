# Get Operators

The Reloadly Node SDK allows you to fetch available mobile operators for a specific country.

Authentication and token refresh are handled automatically by the SDK.

## Optional Query Parameters for Get Operators

| Parameter             | Type    | Description                                                               | Default | Example |
| --------------------- | ------- | ------------------------------------------------------------------------- | ------- | ------- |
| `includeBundles`      | Boolean | Include airtime and data bundles offered by the operator in the response. | true    | true    |
| `includeData`         | Boolean | Include airtime or data plans offered by the operator in the response.    | true    | true    |
| `suggestedAmountsMap` | Boolean | Return suggested amounts in the response.                                 | false   | false   |
| `size`                | Integer | Number of operators to retrieve per page.                                 | 200     | 10      |
| `page`                | Integer | Page number of the operator list to retrieve.                             | 1       | 2       |
| `includeCombo`        | Boolean | Include combo products offered by the operator in the response.           | true    | false   |
| `comboOnly`           | Boolean | Filter to only return available combo operators.                          | false   | false   |
| `bundlesOnly`         | Boolean | Filter to only return available bundle operators.                         | false   | false   |
| `dataOnly`            | Boolean | Filter to only return available data operators.                           | false   | false   |
| `pinOnly`             | Boolean | Filter to only return available pin operators.                            | false   | false   |

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
    const operators = await reloadly.airtime.getOperators();
    console.log('Operators in Nigeria:', operators);
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
- Optional query parameters allow you to filter and customize the operator list (bundles, data, combo, pin, pagination).
- Useful for retrieving operator details before performing top-ups or checking promotions.
