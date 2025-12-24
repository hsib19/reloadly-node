# Get Transactions

The Reloadly Node SDK allows you to fetch a list of top-up transactions with optional filters.

Authentication and token refresh are handled automatically by the SDK.

## Query Parameters

| Parameter          | Type    | Description                                                                                     | Default | Example             |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------- | ------- | ------------------- |
| `size`             | Integer | Number of transactions to be retrieved per page.                                                | 200     | 10                  |
| `page`             | Integer | Page number of the transactions list to retrieve.                                               | 1       | 1                   |
| `countryCode`      | String  | ISO code of the country assigned to the top-up's receiver at the time the transaction was made. | —       | US                  |
| `customIdentifier` | String  | Unique reference assigned to the top-up transaction at the time it was made.                    | —       | april-top-up        |
| `startDate`        | String  | Beginning of the timeframe range for the transactions to be retrieved.                          | —       | 2021-04-30 00:00:00 |
| `endDate`          | String  | End of the timeframe range for the transactions to be retrieved.                                | —       | 2021-07-30 00:00:00 |

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
    const transactions = await reloadlySDK.giftcards.getTransactions({
      size: 10,
      page: 1,
      countryCode: 'US',
      customIdentifier: 'april-top-up',
      startDate: '2021-04-30 00:00:00',
      endDate: '2021-07-30 00:00:00',
    });

    console.log('Transactions:', transactions);
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
    "transactionId": 1,
    "amount": 60553.3575,
    "discount": 0,
    "currencyCode": "NGN",
    "fee": 1880,
    "customIdentifier": "obucks3",
    "status": "SUCCESSFUL",
    "product": {
      "productId": 4,
      "productName": "Amazon Spain",
      "countryCode": "ES",
      "quantity": 5,
      "unitPrice": 25,
      "totalPrice": 125,
      "currencyCode": "EUR",
      "brand": {
        "brandId": 2,
        "brandName": "Amazon"
      }
    },
    "smsFee": 185.76,
    "totalFee": 2065.76,
    "receipientPhone": 34012345678,
    "recipientEmail": "johndoe@gmail.com",
    "transactionCreatedTime": "2022-02-28 13:46:00",
    "preOrdered": false,
    "balanceInfo": {
      "oldBalance": 60582.23641,
      "newBalance": 28.86891,
      "cost": 60553.3575,
      "currencyCode": "NGN",
      "currencyName": "Nigerian Naira",
      "updatedAt": "2022-02-28 13:46:00"
    }
  },
  {},
  {}
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters `size` and `page` are optional and control pagination of results.
- `countryCode`, and `customIdentifier` can be used to filter transactions by country, operator, or unique reference.
- `startDate` and `endDate` allow retrieval of transactions within a specific timeframe.
- All date values must be provided in the format `YYYY-MM-DD HH:mm:ss`.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Giftcards requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for auditing, reporting, or tracking top-up activity across operators, countries, and custom identifiers.
