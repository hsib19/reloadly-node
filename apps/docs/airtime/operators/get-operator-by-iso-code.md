# Get Operators by ISO Code

The Reloadly Node SDK allows you to fetch all operators available in a specific country using its ISO code.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter     | Type   | Required | Description                                                   | Example |
| ------------- | ------ | -------- | ------------------------------------------------------------- | ------- |
| `countryCode` | String | Yes      | The ISO code of the country where the operator is registered. | CO      |

## Query Parameters

| Parameter             | Type    | Description                                               | Default | Example |
| --------------------- | ------- | --------------------------------------------------------- | ------- | ------- |
| `suggestedAmountsMap` | Boolean | Return suggested amounts map in the response.             | false   | false   |
| `suggestedAmounts`    | Boolean | Return suggested amounts in the response.                 | false   | false   |
| `includePin`          | Boolean | Include PIN details if applicable to the operator.        | true    | false   |
| `includeData`         | Boolean | Include data plans offered by the operator.               | true    | false   |
| `includeBundles`      | Boolean | Include airtime and data bundles offered by the operator. | true    | false   |
| `includeCombo`        | Boolean | Include combo products offered by the operator.           | true    | false   |
| `comboOnly`           | Boolean | Filter to only return available combo operators.          | false   | false   |
| `bundlesOnly`         | Boolean | Filter to only return available bundle operators.         | false   | false   |
| `dataOnly`            | Boolean | Filter to only return available data operators.           | false   | false   |
| `pinOnly`             | Boolean | Filter to only return available pin operators.            | false   | false   |

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
    const getOperatorByISOCode = await reloadlySDK.airtime.getOperatorByISOCode({
      path: {
        countryCode: 'ID', // ISO code country, example: Indonesia
      },
      query: {
        suggestedAmountsMap: false,
        suggestedAmounts: false,
        includePin: true,
        includeData: true,
        includeBundles: true,
        includeCombo: true,
        comboOnly: false,
        bundlesOnly: false,
        dataOnly: false,
        pinOnly: false,
      },
    });

    console.log('Operators in Indonesia:', getOperatorByISOCode);
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
  "example": {
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
}
```

## Notes

- Path parameter `countryCode` **wajib** diisi untuk menentukan negara.
- Query parameters bersifat **opsional** dan dapat digunakan untuk menyesuaikan hasil (misalnya hanya menampilkan operator dengan bundles, data plans, PIN, atau combo).
- Bekerja untuk **sandbox** maupun **production** environment.
- Token creation, storage, dan automatic refresh ditangani otomatis oleh SDK.
- SDK secara otomatis menambahkan `Accept` headers yang diperlukan untuk Airtime requests.
- Error handling dengan `ReloadlyAPIError` membantu membedakan error dari API dan error runtime.
- Berguna untuk mendapatkan daftar operator di suatu negara sebelum melakukan top-up atau mengecek promosi.
