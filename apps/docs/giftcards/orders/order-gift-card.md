# Order Gift Card

The Reloadly Node SDK allows you to place an order for a gift card product.

Authentication and token refresh are handled automatically by the SDK.

## Payload Description

| Parameter                       | Type    | Required | Description                                                                                                                                                                                                                                              | Example          |
| ------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `customIdentifier`              | String  | No       | Unique reference assigned to a gift card order before purchase. Ensure you change the sample identifier in the payload before making a request to avoid errors.                                                                                          | obucks10         |
| `preOrder`                      | Boolean | No       | Set to `true` if users want to pre-order the gift card. Defaults to `false` if omitted.                                                                                                                                                                  | false            |
| `productAdditionalRequirements` | Object  | No       | Optional object for passing additional information required by some products.                                                                                                                                                                            | —                |
| `productId`                     | Integer | Yes      | Product identification number of the gift card to be purchased/ordered.                                                                                                                                                                                  | 10               |
| `quantity`                      | Integer | Yes      | Number of gift cards to be ordered.                                                                                                                                                                                                                      | 2                |
| `recipientEmail`                | String  | No       | Recipient’s email for the gift card purchase. If absent, no email will be sent from Reloadly.                                                                                                                                                            | anyone@email.com |
| `recipientPhoneDetails`         | Object  | No       | Object containing details of the recipient’s mobile number. Can be used as a second layer of authentication for recipients of gift card purchases.                                                                                                       | —                |
| `senderName`                    | String  | Yes      | Name on the gift card receipt upon purchase.                                                                                                                                                                                                             | John Doe         |
| `unitPrice`                     | Number  | Yes      | Price of the gift card to be purchased. Must match a price listed in either: <br>1. `fixedRecipientDenominations` (for FIXED denomination products) <br>2. `minRecipientDenominations` or `maxRecipientDenominations` (for RANGE denomination products). | 5                |

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
    const order = await reloadlySDK.giftcards.orderGiftCard({
      customIdentifier: 'obucks10',
      preOrder: false,
      productId: 10,
      quantity: 2,
      recipientEmail: 'anyone@email.com',
      senderName: 'John Doe',
      unitPrice: 5,
      recipientPhoneDetails: {
        countryCode: 'US',
        phoneNumber: '1234567890',
      },
    });

    console.log('Gift card order response:', order);
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
  "transactionId": 1,
  "amount": 34536.21,
  "discount": 1709.72,
  "currencyCode": "NGN",
  "fee": 1880,
  "recipientEmail": "anyone@email.com",
  "customIdentifier": "obucks1dime0",
  "status": "SUCCESSFUL",
  "product": {
    "productId": 1,
    "productName": "1-800-PetSupplies",
    "countryCode": "PS",
    "quantity": 1,
    "unitPrice": 59.99,
    "totalPrice": 59.99,
    "currencyCode": "USD",
    "brand": {
      "brandId": 6,
      "brandName": "1-800-PetSupplies"
    }
  },
  "smsFee": 185.76,
  "totalFee": 2065.76,
  "receipientPhone": 34012345678,
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
```

## Notes

- Works for both **sandbox** and **production** environments.
- `customIdentifier` must be unique for each order to avoid errors.
- Required fields: `productId`, `quantity`, `senderName`, and `unitPrice`.
- `unitPrice` must match a valid denomination listed in the product details (either FIXED or RANGE).
- Optional fields like `recipientEmail`, `recipientPhoneDetails`, and `productAdditionalRequirements` allow for extra delivery and authentication options.
- If `preOrder` is omitted, it defaults to `false`.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Gift Card requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for placing gift card orders directly from your application and delivering them to recipients.
