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
    const getTransactionById = await reloadlySDK.giftcards.getTransactionById('163165');

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
  }
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Path parameter `transactionId` is **required** to identify the specific transaction.
- The response includes details such as transaction ID, operator information, amount, recipient details, and current status (`PENDING`, `SUCCESS`, or `FAILED`).
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Giftcards requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving detailed information about a single transaction for auditing, reporting, or troubleshooting.
