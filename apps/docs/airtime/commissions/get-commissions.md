# Get Commissions

The Reloadly Node SDK allows you to fetch operators offering discounts (commissions).

Authentication and token refresh are handled automatically by the SDK.

## Optional Query Parameters

| Parameter | Type    | Description                                                      | Default | Example |
| --------- | ------- | ---------------------------------------------------------------- | ------- | ------- |
| `size`    | Integer | Number of operators offering discounts to be retrieved per page. | 200     | 10      |
| `page`    | Integer | Page number of the discounts list to retrieve.                   | 1       | 1       |

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
    // Fetch commissions with optional query parameters
    const getCommissions = await reloadlySDK.airtime.getCommissions({
      size: 10,
      page: 1,
    });

    console.log('Commissions:', getCommissions);
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
  "content": [
    {
      "operator": {
        "operatorId": 1,
        "name": "Afghan Wireless Afghanistan",
        "countryCode": "AF",
        "status": true,
        "bundle": false
      },
      "percentage": 10,
      "internationalPercentage": 10,
      "localPercentage": 0,
      "updatedAt": "2021-06-26 03:36:16"
    },
    {},
    {}
  ]
}
```

## Notes

- Works for both **sandbox** and **production** environments.
- Query parameters `size` and `page` are optional and allow pagination of the commissions list.
- Token creation, storage, and automatic refresh are handled by the SDK.
- The SDK automatically applies the correct `Accept` headers required for Airtime requests.
- Error handling with `ReloadlyAPIError` ensures you can capture API-specific issues and unexpected runtime errors.
- Useful for retrieving operator discounts before performing top-ups, helping you identify potential savings opportunities.
