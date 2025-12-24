# Pay Utility Bill

The Reloadly Node SDK allows you to pay utility bills by providing the required payload.

Authentication and token refresh are handled automatically by the SDK.

## Payload Description

| Parameter                 | Type    | Required | Description                                                                                                                                                                    | Example                |
| ------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `additionalInfo`          | Object  | No       | Optional object that allows the passage of extra information required by some billers.                                                                                         | —                      |
| `amount`                  | Number  | Yes      | Indicates the amount to be paid.                                                                                                                                               | 1000                   |
| `amountId`                | Number  | No       | Unique ID for fixed amounts. Applicable only to billers with fixed denomination type.                                                                                          | —                      |
| `billerId`                | Number  | Yes      | Identification number of the biller retrieved from the **Get Billers** endpoint.                                                                                               | 5                      |
| `referenceId`             | String  | No       | Unique string reference tied to the transaction. Can be used to query back the transaction. Ensure you change the sample identifier before making a request to avoid errors.   | april-electricity-bill |
| `subscriberAccountNumber` | String  | Yes      | Account, reference, or card number of the subscriber or recipient of the bill payment.                                                                                         | 04223568280            |
| `useLocalAmount`          | Boolean | No       | Indicates if the amount is presented in the local currency of the biller. Defaults to `false` if omitted, meaning the payment will be presented in the user's wallet currency. | false                  |

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
    const billPayment = await reloadlySDK.utilityBillers.payBill({
      additionalInfo: { meterType: 'PREPAID' },
      amount: 1000,
      billerId: 5,
      referenceId: 'april-electricity-bill',
      subscriberAccountNumber: '04223568280',
      useLocalAmount: false,
    });

    console.log('Bill payment response:', billPayment);
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
  "id": 36,
  "status": "PROCESSING",
  "referenceId": "4a391847-n193-22k8-wqkl-9h3s7428m036",
  "code": "PAYMENT_PROCESSING_IN_PROGRESS",
  "message": "The payment is being processed, status will be updated when biller processes the payment.",
  "submittedAt": "2022-05-18 09:13:53",
  "finalStatusAvailabilityAt": "2022-05-19 09:13:52"
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Required fields: `amount`, `billerId`, and `subscriberAccountNumber`.
- `referenceId` must be unique if provided, to avoid transaction conflicts.
- `amountId` is only applicable for billers with fixed denomination types.
- `useLocalAmount` defaults to `false` if omitted, meaning the payment will be processed in the wallet currency.
- Optional `additionalInfo` allows passing extra details required by certain billers (e.g., meter type).
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Utility Billers requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for integrating bill payment services directly into your application.
