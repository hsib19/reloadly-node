# Get Country by ISO Code

The Reloadly Node SDK allows you to fetch details of a specific country using its ISO code.

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
    // Example: Fetch country by ISO code "NG" (Nigeria)
    const country = await reloadly.airtime.getCountryByIso('NG');
    console.log('Country details:', country);
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
    "isoName": "AG",
    "name": "Antigua and Barbuda",
    "continent": "North America",
    "currencyCode": "XCD",
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "XCD",
    "flag": "https://s3.amazonaws.com/rld-flags/ag.svg",
    "callingCodes": ["+1268"]
  }
]
```

## Notes

- Works for both **sandbox** and **production** environments.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving detailed information about a single country before fetching operators or performing top-ups.
