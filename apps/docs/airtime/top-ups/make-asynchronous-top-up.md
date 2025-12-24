# Make Asynchronous Top-Up

The Reloadly Node SDK allows you to initiate airtime or data top-ups asynchronously.

Authentication and token refresh are handled automatically by the SDK.

## Payload Description

| Parameter          | Type    | Required | Description                                                                                         | Example                                         |
| ------------------ | ------- | -------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `amount`           | String  | Yes      | The amount of airtime or data to be recharged.                                                      | "5.00"                                          |
| `customIdentifier` | String  | No       | Unique transaction reference for the recharge. Each identifier must be unique and cannot be reused. | "Async identifier 200"                          |
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
    const makeAsyncTopUp = await reloadlySDK.airtime.asyncTopUp({
      operatorId: '535',
      amount: '5.00',
      useLocalAmount: true,
      customIdentifier: 'Async identifier 200',
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

    console.log('Async top-up initiated:', makeAsyncTopUp);
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
  "transactionId": 4602843
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
- Asynchronous top-ups return a **PENDING** status initially; the final status can be retrieved later via transaction lookup.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for initiating top-ups without waiting for immediate completion, especially in high-volume or batch processing scenarios.
