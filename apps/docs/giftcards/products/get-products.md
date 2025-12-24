# Get Gift Card Products

The Reloadly Node SDK allows you to fetch available gift card products with optional filters.

Authentication and token refresh are handled automatically by the SDK.

## Query Parameters

| Parameter           | Type    | Description                                                           | Example |
| ------------------- | ------- | --------------------------------------------------------------------- | ------- |
| `size`              | Integer | Number of gift card products to be retrieved per page.                | 10      |
| `page`              | Integer | Page number of the product list to retrieve.                          | 1       |
| `productName`       | String  | Name of the gift card product.                                        | Amazon  |
| `countryCode`       | String  | ISO code of the country whose gift card products are to be retrieved. | US      |
| `productCategoryId` | String  | Unique identifier of the category.                                    | 2       |
| `includeRange`      | Boolean | Include products with `denominationType` specified as RANGE.          | true    |
| `includeFixed`      | Boolean | Include products with `denominationType` specified as FIXED.          | true    |

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
    const products = await reloadlySDK.giftcards.getProducts({
      size: 10,
      page: 1,
      productName: 'Amazon',
      countryCode: 'US',
      productCategoryId: '2',
      includeRange: true,
      includeFixed: true,
    });

    console.log('Gift card products:', products);
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
  "productId": 1,
  "productName": "1-800-PetSupplies",
  "global": false,
  "senderFee": 205.29,
  "senderFeePercentage": 1,
  "status": "ACTIVE",
  "discountPercentage": 7.5,
  "denominationType": "FIXED",
  "recipientCurrencyCode": "USD",
  "recipientCurrencyToSenderCurrencyExchangeRate": 570,
  "minRecipientDenomination": null,
  "maxrecipientDenomination": null,
  "senderCurrencyCode": "NGN",
  "minSenderDenomination": null,
  "maxSenderDenomination": null,
  "fixedRecipientDenominations": [25, 50],
  "fixedSenderDenominations": [10264.5, 20529],
  "fixedRecipientToSenderDenominationsMap": [
    {
      "25.00": 10264.5
    },
    {
      "50.00": 20529
    }
  ],
  "logoUrls": ["https://cdn.reloadly.com/giftcards/5daa2b8b-b1ad-4ca6-a34d-a7ce3c14dfaf.jpg"],
  "brand": {
    "brandId": 1,
    "brandName": "1-800-PetSupplies"
  },
  "category": {
    "id": 5,
    "name": "Fashion and Retails"
  },
  "country": {
    "isoName": "US",
    "name": "United States",
    "flagUrl": "https://s3.amazonaws.com/rld-flags/us.svg"
  },
  "redeemInstruction": {
    "concise": "This card is redeemable for merchandise on www.1-800-petsupplies.com",
    "verbose": "Your acceptance of this eCertificate constitutes your agreement to these terms and conditions. This card is redeemable in U.S. only for merchandise on www.1-800-petsupplies.com . Only two eCertificates are redeemable per order. eCertificates cannot be redeemed for cash, except as required by law. Void if altered or reproduced. This gift card is issued in U.S. funds by Tabcom, LLC. When Redeeming online please be sure to enter the entire gift card number including preceding zeros. The maximum number of eCertificates that can be used for phone is nine. By accepting these Terms and Conditions through your use of this Site, you certify that you reside in the United States and are 18 years of age or older. If you are under the age of 18 but at least 14 years of age you may use this Site only under the supervision of a parent or legal guardian who agrees to be bound by these Terms and Conditions."
  },
  "additionalRequirements": {
    "userIdRequired": false
  }
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters allow filtering by product name, country, category, and denomination type.
- `size` and `page` are optional and control pagination of results.
- `includeRange` and `includeFixed` let you specify whether to include products with RANGE or FIXED denominations.
- The response includes product details such as ID, name, category, denomination type, and currency.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for discovering available gift card products before purchase or integration into your application.
