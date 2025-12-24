# View Account Balance

The Reloadly Node SDK makes it easy to check your account balance without worrying about tokens or headers.

Authentication and token refresh are handled automatically by the SDK.

## Example with Error Handling

```ts
import { Reloadly, ReloadlyAPIError } from 'reloadly-node';

const reloadly = new Reloadly({
  clientId: process.env.RELOADLY_CLIENT_ID!,
  clientSecret: process.env.RELOADLY_CLIENT_SECRET!,
  environment: 'sandbox', // or "production"
});

async function main() {
  try {
    const balance = await reloadly.utilityPayments.getBalance();
    console.log('Account Balance:', balance);
  } catch (error) {
    if (error instanceof ReloadlyAPIError) {
      // Handle Reloadly API errors
      console.error('Reloadly API Error:', error.message);
      console.error('Error details:', error.data);
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
    }
  }
}
```

## Response Example

```json
{
  "balance": 100.0,
  "currencyCode": "USD",
  "currencyName": "United States Dollar",
  "updatedAt": "2025-12-24T15:00:00Z"
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Token management and automatic refresh are handled by the SDK.
- The SDK applies the correct `Accept` headers for each service (Airtime, GiftCards, Utility Payments).
- Error handling with `ReloadlyAPIError` helps distinguish API errors from unexpected runtime issues.
- Focus on building features — authentication and headers are abstracted away.
