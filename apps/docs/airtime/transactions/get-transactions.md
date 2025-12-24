# Get Transactions

The Reloadly Node SDK allows you to fetch a list of top-up transactions with optional filters.

Authentication and token refresh are handled automatically by the SDK.

## Query Parameters

| Parameter          | Type    | Description                                                                                     | Default | Example             |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------- | ------- | ------------------- |
| `size`             | Integer | Number of transactions to be retrieved per page.                                                | 200     | 10                  |
| `page`             | Integer | Page number of the transactions list to retrieve.                                               | 1       | 1                   |
| `countryCode`      | String  | ISO code of the country assigned to the top-up's receiver at the time the transaction was made. | —       | US                  |
| `operatorId`       | String  | Operator identification number assigned to the top-up transaction at the time it was made.      | —       | 341                 |
| `operatorName`     | String  | Operator name assigned to the top-up transaction at the time it was made.                       | —       | MTN Nigeria         |
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
    const transactions = await reloadlySDK.airtime.getTransactions({
      size: 10,
      page: 1,
      countryCode: 'US',
      operatorId: '341',
      operatorName: 'MTN Nigeria',
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
{
  "content": [
    {
      "transactionId": 4602843,
      "status": "SUCCESSFUL",
      "operatorTransactionId": "7297929551:OrderConfirmed",
      "customIdentifier": "This is example identifier 130",
      "recipientPhone": 447951631337,
      "recipientEmail": null,
      "senderPhone": 11231231231,
      "countryCode": "GB",
      "operatorId": 535,
      "operatorName": "EE PIN England",
      "discount": 63.37,
      "discountCurrencyCode": "NGN",
      "requestedAmount": 3168.4,
      "requestedAmountCurrencyCode": "NGN",
      "deliveredAmount": 4.9985,
      "deliveredAmountCurrencyCode": "GBP",
      "transactionDate": "2021-12-06 08:13:39",
      "pinDetail": {
        "serial": 558111,
        "info1": "DIAL *611",
        "info2": "DIAL *611",
        "info3": "DIAL *611",
        "value": null,
        "code": 773709733097662,
        "ivr": "1-888-888-8888",
        "validity": "30 days"
      },
      "balanceInfo": null
    },
    {},
    {}
  ]
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters `size` and `page` are optional and control pagination of results.
- `countryCode`, `operatorId`, `operatorName`, and `customIdentifier` can be used to filter transactions by country, operator, or unique reference.
- `startDate` and `endDate` allow retrieval of transactions within a specific timeframe.
- All date values must be provided in the format `YYYY-MM-DD HH:mm:ss`.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for auditing, reporting, or tracking top-up activity across operators, countries, and custom identifiers.
