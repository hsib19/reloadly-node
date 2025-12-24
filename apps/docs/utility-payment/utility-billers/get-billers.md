# Get Utility Billers

The Reloadly Node SDK allows you to fetch available utility billers with optional filters.

Authentication and token refresh are handled automatically by the SDK.

## Query Parameters

| Parameter        | Type    | Required | Description                                                                                                                                          | Example                  |
| ---------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `id`             | Integer | No       | Unique identification number of each biller. Identifies the biller servicing the utility.                                                            | 12                       |
| `name`           | String  | No       | Biller’s name. Partial names can be used if the biller’s name is long.                                                                               | Eko Electricity          |
| `type`           | String  | No       | Type of utility payment handled by the biller. Values: `ELECTRICITY_BILL_PAYMENT`, `WATER_BILL_PAYMENT`, `TV_BILL_PAYMENT`, `INTERNET_BILL_PAYMENT`. | ELECTRICITY_BILL_PAYMENT |
| `serviceType`    | String  | No       | Payment service type rendered by the utility biller. Examples: `PREPAID`, `POSTPAID`.                                                                | PREPAID                  |
| `countryISOCode` | String  | No       | ISO code of the country where the utility biller operates.                                                                                           | KE                       |
| `page`           | Integer | No       | Page of the billers list being retrieved. Default value is 1.                                                                                        | 1                        |
| `size`           | Integer | No       | Number of billers to be retrieved per page. Default value is 20.                                                                                     | 10                       |

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
    const billers = await reloadlySDK.utilityBillers.getBillers({
      id: 12,
      name: 'Eko Electricity',
      type: 'ELECTRICITY_BILL_PAYMENT',
      serviceType: 'PREPAID',
      countryISOCode: 'KE',
      page: 1,
      size: 10,
    });

    console.log('Utility billers:', billers);
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
  "content": [
    {
      "id": 1,
      "name": "Ikeja Electricity Postpaid",
      "countryIsoCode": "NG",
      "type": "ELECTRICITY_BILL_PAYMENT",
      "serviceType": "POSTPAID",
      "localAmountSupported": true,
      "localTransactionCurrencyCode": "NGN",
      "minLocalTransactionAmount": 1000,
      "maxLocalTransactionAmount": 300000,
      "localTransactionFee": 227.83997,
      "localTransactionFeeCurrencyCode": "NGN",
      "localTransactionFeePercentage": 0,
      "localDiscountPercentage": 0,
      "internatonalAmountSupported": true,
      "internationalTransactionCurrencyCode": "INR",
      "minInternationalTransactionAmount": 194.73483,
      "maxInternationalTransactionAmount": 45567.996,
      "internationalTransactionFee": 227.83997,
      "internationalTransactionFeePercentage": 0,
      "internationalTransactionFeeCurrencyCode": "INR",
      "internationalDiscountPercentage": 0,
      "requiresInvoice": true,
      "fx": [
        {
          "rate": 5.20265
        },
        {
          "curencyCode": "INR"
        }
      ]
    },
    {},
    {}
  ]
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters allow filtering by biller ID, name, type, service type, and country ISO code.
- `page` and `size` are optional and control pagination of results (default: page = 1, size = 20).
- The response includes biller details such as ID, name, type, service type, country, and status.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Utility Billers requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for discovering available utility billers before integrating bill payment services into your application.
