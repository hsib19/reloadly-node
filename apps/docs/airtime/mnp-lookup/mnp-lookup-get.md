# MNP Lookup (GET)

The Reloadly Node SDK allows you to perform a Mobile Number Portability (MNP) lookup to retrieve details about a mobile number, including its current operator.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter     | Type   | Required | Description                                                        | Example    |
| ------------- | ------ | -------- | ------------------------------------------------------------------ | ---------- |
| `phone`       | Number | Yes      | The mobile number whose details are to be retrieved.               | 8147658721 |
| `countryCode` | String | Yes      | The ISO code of the country where the mobile number is registered. | NG         |

## Query Parameters

| Parameter             | Type    | Description                                                 | Default | Example |
| --------------------- | ------- | ----------------------------------------------------------- | ------- | ------- |
| `suggestedAmountsMap` | Boolean | Indicates if this field should be returned in the response. | false   | false   |
| `suggestedAmounts`    | Boolean | Indicates if this field should be returned in the response. | false   | false   |

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
    const mnpLookupGET = await reloadlySDK.airtime.mnpLookupGET({
      path: {
        countryCode: 'NG',
        phone: 8147658721,
      },
      query: {
        suggestedAmountsMap: false,
        suggestedAmounts: false,
      },
    });

    console.log('MNP Lookup result:', mnpLookupGET);
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
  "promotions": []
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameters `phone` and `countryCode` are **required** to identify the mobile number and its country.
- Query parameters `suggestedAmountsMap` and `suggestedAmounts` are optional and default to `false`.
- The response provides details such as operator ID, operator name, and whether the number has been ported.
- Enabling `suggestedAmounts` or `suggestedAmountsMap` will include available recharge amounts or mappings in the response.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for validating recipient numbers, determining the correct operator, and ensuring accurate top-ups.
