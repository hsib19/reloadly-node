# Get Transactions

The Reloadly Node SDK allows you to retrieve a list of transactions with optional filters.

Authentication and token refresh are handled automatically by the SDK.

## Query Parameters

| Parameter           | Type    | Required | Description                                                                                                          | Example                  |
| ------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `referenceId`       | String  | No       | The reference ID you may have specified while placing the transaction.                                               | april-electricity-bill   |
| `page`              | Integer | No       | The page to be retrieved from the transaction list.                                                                  | 10                       |
| `size`              | Integer | No       | Number of items to include in a single page.                                                                         | 1                        |
| `startDate`         | String  | No       | Start date for the range of transactions to be retrieved.                                                            | 2021-06-01 00:00:00      |
| `endDate`           | String  | No       | End date for the range of transactions to be retrieved.                                                              | 2022-06-01 10:00:00      |
| `status`            | String  | No       | Transaction status. Values: `PROCESSING`, `SUCCESSFUL`, `FAILED`, `REFUNDED`.                                        | PROCESSING               |
| `serviceType`       | String  | No       | Biller’s service type. Values: `PREPAID`, `POSTPAID`.                                                                | PREPAID                  |
| `billerType`        | String  | No       | Biller’s type. Values: `ELECTRICITY_BILL_PAYMENT`, `WATER_BILL_PAYMENT`, `TV_BILL_PAYMENT`, `INTERNET_BILL_PAYMENT`. | ELECTRICITY_BILL_PAYMENT |
| `billerCountryCode` | String  | No       | ISO code of the country where the biller is located.                                                                 | SN                       |

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
    const transactions = await reloadlySDK.transactions.getTransactions({
      referenceId: 'april-electricity-bill',
      page: 10,
      size: 1,
      startDate: '2021-06-01 00:00:00',
      endDate: '2022-06-01 10:00:00',
      status: 'PROCESSING',
      serviceType: 'PREPAID',
      billerType: 'ELECTRICITY_BILL_PAYMENT',
      billerCountryCode: 'SN',
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
    "code": "PAYMENT_PROCESSED_SUCCESSFULLY",
    "message": "The payment was processed successfully",
    "transaction": {
      "id": 33732,
      "status": "SUCCESSFUL",
      "referenceId": "april-electricity-bill",
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
  },
  {},
  {}
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters allow filtering transactions by reference ID, date range, status, service type, biller type, and country ISO code.
- `page` and `size` are optional and control pagination of results.
- The response includes transaction details such as ID, reference, biller info, amount, currency, status, and date.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Transactions requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving transaction history, filtering by specific criteria, and reconciling payments.
