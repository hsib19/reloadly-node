# Get Countries

The Reloadly Node SDK allows you to easily fetch the list of supported countries for Airtime, GiftCards, or Utility Payments.

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
    const countries = await reloadly.airtime.getCountries();
    console.log('Supported Countries:', countries);
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
[
  {
    "isoName": "NG",
    "name": "Nigeria",
    "currencyCode": "NGN",
    "currencyName": "Nigerian Naira",
    "currencySymbol": "₦"
  },
  {
    "isoName": "US",
    "name": "United States",
    "currencyCode": "USD",
    "currencyName": "United States Dollar",
    "currencySymbol": "$"
  }
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving supported countries before fetching operators or performing top-ups.
