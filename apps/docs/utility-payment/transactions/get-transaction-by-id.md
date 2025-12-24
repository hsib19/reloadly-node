# Get Transaction by ID

The Reloadly Node SDK allows you to fetch details of a specific utility payment transaction using its ID.

Authentication and token refresh are handled automatically by the SDK.

## Path Parameters

| Parameter | Type    | Required | Description                                  | Example |
| --------- | ------- | -------- | -------------------------------------------- | ------- |
| `id`      | Integer | Yes      | The utility payment's identification number. | 10      |

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
    const transaction = await reloadlySDK.transactions.getTransactionById(10);

    console.log('Transaction details:', transaction);
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
    "code": "PAYMENT_PROCESSED_SUCCESSFULLY",
    "message": "The payment was processed successfully",
    "transaction": {
      "id": 33732,
      "status": "SUCCESSFUL",
      "referenceId": "wwklmddleeqfnee9re0080",
      "amount": 1000,
      "amountCurrencyCode": "XOF",
      "deliveryAmount": 1000,
      "deliveryAmountCurrencyCode": "XOF",
      "fee": 0,
      "feeCurrencyCode": "USD",
      "discount": 0,
      "discountCurrencyCode": "USD",
      "submittedAt": "2023-09-05 23:36:58",
      "balanceInfo": {
        "oldBalance": 36.96433,
        "newBalance": 35.12964,
        "cost": 1.83469,
        "currencyCode": "USD",
        "currencyName": "US Dollar",
        "updatedAt": "2023-09-06 03:34:57"
      },
      "billDetails": {
        "type": "ELECTRICITY_BILL_PAYMENT",
        "billerId": 26,
        "billerName": "Woyofal Senegal",
        "billerCountryCode": "SN",
        "billerReferenceId": "T_QKTBYLMGPA",
        "serviceType": "PREPAID",
        "completedAt": "2023-09-05 23:37:14",
        "subscriberDetails": {
          "invoiceId": null,
          "accountNumber": "14414354515"
        },
        "pinDetails": {
          "token": "2737-6032-5315-7183-0856",
          "info1": "10.7 kWh",
          "info2": null,
          "info3": null
        }
      }
    }
  }
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `id` is **required** to identify the specific utility payment transaction.
- The response includes transaction details such as ID, reference ID, biller information, amount, currency, status, and date.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Transactions requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving details of a single transaction for reconciliation, auditing, or customer support.
