# Auto Detect Operator

The Reloadly Node SDK allows you to automatically detect the operator for a given phone number in a specific country.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter        | Type    | Required | Description                                                        | Example    |
| ---------------- | ------- | -------- | ------------------------------------------------------------------ | ---------- |
| `phone`          | Integer | Yes      | The mobile number whose details are to be retrieved.               | 8147658721 |
| `countryIsoCode` | String  | Yes      | The ISO code of the country where the mobile number is registered. | NG         |

## Query Parameters

| Parameter             | Type    | Description                                                            | Default | Example |
| --------------------- | ------- | ---------------------------------------------------------------------- | ------- | ------- |
| `suggestedAmountsMap` | Boolean | Indicates if suggested amounts map should be returned in the response. | false   | true    |
| `suggestedAmounts`    | Boolean | Indicates if suggested amounts should be returned in the response.     | false   | false   |

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
    const operator = await reloadly.airtime.autoDetectOperator({
      path: {
        countryIsoCode: 'ID',
        phone: 6281387999999,
      },
      query: {
        suggestedAmountsMap: true,
        suggestedAmounts: false,
      },
    });

    console.log('Auto-detected operator:', operator);
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
- Requires both `phone` and `countryIsoCode` as path parameters.
- Optional query parameters (`suggestedAmountsMap`, `suggestedAmounts`) allow you to enrich the response with suggested top-up values.
- Useful for automatically detecting the correct operator before performing top-ups or checking promotions.
