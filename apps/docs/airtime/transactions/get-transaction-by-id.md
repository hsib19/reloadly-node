# Get Transaction by ID

The Reloadly Node SDK allows you to fetch details of a specific top-up transaction by its unique transaction ID.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter       | Type    | Required | Description                                                   | Example |
| --------------- | ------- | -------- | ------------------------------------------------------------- | ------- |
| `transactionId` | Integer | Yes      | The identification number of the transaction to be retrieved. | 101     |

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
    const getTransactionById = await reloadlySDK.airtime.getTransactionById('163165');

    console.log('Transaction details:', getTransactionById);
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
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `transactionId` is **required** to identify the specific transaction.
- The response includes details such as transaction ID, operator information, amount, recipient details, and current status (`PENDING`, `SUCCESS`, or `FAILED`).
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving detailed information about a single transaction for auditing, reporting, or troubleshooting.
