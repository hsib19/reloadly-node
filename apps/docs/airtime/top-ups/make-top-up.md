# Make Top-Up

The Reloadly Node SDK allows you to perform airtime or data top-ups for a recipient.

Authentication and token refresh are handled automatically by the SDK.

## Payload Description

| Parameter          | Type    | Required | Description                                                                                         | Example                                         |
| ------------------ | ------- | -------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `amount`           | String  | Yes      | The amount of airtime or data to be recharged.                                                      | "5.00"                                          |
| `customIdentifier` | String  | No       | Unique transaction reference for the recharge. Each identifier must be unique and cannot be reused. | "This is example identifier 130"                |
| `operatorId`       | String  | Yes      | The operator's identification number.                                                               | "535"                                           |
| `recipientEmail`   | String  | No       | The top-up receiver's email (only applicable to Nauta Cuba top-ups).                                | "peter@nauta.com.cu"                            |
| `recipientPhone`   | Object  | Yes      | Contains information on the recipient's phone details (`countryCode`, `number`).                    | `{ countryCode: "GB", number: "447951731337" }` |
| `senderPhone`      | Object  | No       | Contains information on the sender's phone details (`countryCode`, `number`).                       | `{ countryCode: "CA", number: "11231231231" }`  |
| `useLocalAmount`   | Boolean | No       | Indicates if the recharge is to be made in the operator's local currency. Default is `false`.       | true                                            |

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
    const makeTopUp = await reloadlySDK.airtime.topUp({
      operatorId: '535',
      amount: '5.00',
      useLocalAmount: true,
      customIdentifier: 'This is example identifier 130',
      recipientEmail: 'peter@nauta.com.cu',
      recipientPhone: {
        countryCode: 'GB',
        number: '447951731337',
      },
      senderPhone: {
        countryCode: 'CA',
        number: '11231231231',
      },
    });

    console.log('Top-up response:', makeTopUp);
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
  "fee": 2.99891,
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
    "oldBalance": 5109.53732,
    "newBalance": 2004.50532,
    "currencyCode": "NGN",
    "currencyName": "Nigerian Naira",
    "updatedAt": "2021-12-06 13:13:39"
  }
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Request body parameters `amount`, `operatorId`, and `recipientPhone` are **required**.
- `customIdentifier` must be unique for each transaction; reusing it will result in errors.
- `recipientEmail` is only applicable for **Nauta Cuba** top-ups.
- `recipientPhone` must include both `countryCode` and `number`.
- `senderPhone` is optional but can be included for record-keeping.
- `useLocalAmount` allows the recharge to be made in the operator’s local currency; default is `false`.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for performing real-time airtime or data top-ups for recipients worldwide.
