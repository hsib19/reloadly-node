# Get Top-Up Status

The Reloadly Node SDK allows you to check the status of a specific top-up transaction by its transaction ID.  
Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter       | Type    | Required | Description                                        | Example |
| --------------- | ------- | -------- | -------------------------------------------------- | ------- |
| `transactionId` | Integer | Yes      | The transaction identification number of a top-up. | 13      |

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
    const getTopUpStatus = await reloadlySDK.airtime.getTopUpStatus('163166');

    console.log('Top-up status:', getTopUpStatus);
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
  "code": null,
  "message": null,
  "status": "SUCCESSFUL",
  "transaction": {
    "transactionId": 17123515,
    "status": "SUCCESSFUL",
    "operatorTransactionId": null,
    "customIdentifier": "11120958",
    "recipientPhone": "971503971821",
    "recipientEmail": null,
    "senderPhone": "11231231231",
    "countryCode": "AE",
    "operatorId": 706,
    "operatorName": "Salaam Afghanistan",
    "discount": 0,
    "discountCurrencyCode": "USD",
    "requestedAmount": 1,
    "requestedAmountCurrencyCode": "USD",
    "deliveredAmount": 84,
    "deliveredAmountCurrencyCode": "AFN",
    "transactionDate": "2023-09-20 09:49:59",
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
    "balanceInfo": {
      "cost": 1,
      "currencyCode": "USD",
      "currencyName": "US Dollar",
      "newBalance": 35082.72087,
      "oldBalance": 35083.72087,
      "updatedAt": "2023-09-20 13:49:40"
    }
  }
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `transactionId` is **required** to identify the specific top-up transaction.
- The response includes details such as transaction ID, operator, amount, recipient information, and current status (`PENDING`, `SUCCESS`, or `FAILED`).
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for verifying the outcome of completed transactions or checking the final status of asynchronous top-ups.
